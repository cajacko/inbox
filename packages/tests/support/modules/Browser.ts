/* eslint max-lines: 0 */
import * as puppeteer from 'puppeteer';
import browserSizes from '../config/browserSizes';
import hookConstants from '../config/hookConstants';
import browserHooks from '../utils/browserHooks';
import conditional from '../utils/conditional';
import { ICondition } from '../utils/ensureCondition';
import getSize from '../utils/getSize';

const showBrowser = false;
const shouldClose = !showBrowser;
const headless = !showBrowser;

class Browser {
  private browser: null | puppeteer.Browser = null;
  private page: null | puppeteer.Page = null;
  private hooks: { [key: string]: string } = {};
  private interceptingRequests: boolean = false;
  private dialogHandler?: (dialog: puppeteer.Dialog) => void;
  private dialog?: puppeteer.Dialog;
  private nonHeadless: boolean = false;

  constructor() {
    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogAction = this.dialogAction.bind(this);
  }

  get platform() {
    return 'web';
  }

  public async reset() {
    if (!this.page) return;

    if (shouldClose) {
      await this.page.close();
    }

    this.page = null;
  }

  public async open(nonHeadless: boolean) {
    this.nonHeadless = nonHeadless;

    await this.ensurePage();

    if (!this.page) throw new Error('No page object to do things with');

    await this.page.setViewport(browserSizes[getSize()]);
    await this.setJavaScriptEnabled();
    await this.setRequestInterception();
  }

  private async setJavaScriptEnabled() {
    const disableJS = this.hooks.javascript && this.hooks.javascript === 'off';

    if (!this.page) throw new Error('No page object to set JS with');

    await this.page.setJavaScriptEnabled(!disableJS);
  }

  private async setRequestInterception() {
    if (!this.page) throw new Error('No page object to intercept with');

    if (!this.hooks.javascript || this.hooks.javascript !== 'networkError') {
      this.interceptingRequests = false;
      await this.page.setRequestInterception(false);
      return;
    }

    this.interceptingRequests = true;
    await this.page.setRequestInterception(true);

    this.page.on('request', (interceptedRequest) => {
      // This callback still gets called if we enabled and then disabled
      // setRequestInterception. And will error if we try to abort/continue when
      // it is disabled
      if (!this.interceptingRequests) return;

      if (interceptedRequest.url().endsWith('bundle.js')) {
        interceptedRequest.abort();
      } else interceptedRequest.continue();
    });
  }

  public async close() {
    if (this.browser && shouldClose) {
      await this.browser.close();
    }
  }

  public async navigate(route: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to navigate within');

    const pageLoadPromise = new Promise((resolve) => {
      if (!this.page) throw new Error('No page object to check for load');

      this.page.once('load', () => {
        // Give the js a bit of time to do something after load
        setTimeout(resolve, 100);
      });
    });

    await this.page.goto(`http://localhost:3000${route}?test-env=true`, {
      waitUntil: 'domcontentloaded',
    });

    await this.setHooks();

    await pageLoadPromise;
  }

  public async setHooks() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to set hooks within');

    await this.page.evaluate(browserHooks, this.hooks, hookConstants);
  }

  public async screenshot(path: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to take a screenshot with');

    await this.page.screenshot({ path });
  }

  public async exists(selector: string) {
    const element = await this.getElement(selector);

    if (!element) {
      throw new Error(`Element does not exist at selector "${selector}"`);
    }

    return element;
  }

  public async visible(condition: ICondition, selector: string) {
    await this.ensurePage();

    await conditional(
      condition,
      () => {
        if (!this.page) {
          throw new Error('No page object to check the elements visibility');
        }

        return this.page.evaluate((selectorParam) => {
          const element = document.querySelector(selectorParam);

          if (!element) return false;

          const style = window.getComputedStyle(element);

          return (
            style &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
          );
        }, selector);
      },
      {
        negative: `Element at "${selector}" is visible, expected it to be not visible`,
        positive: `Element at "${selector}" is not visible`,
        waitNegative: `Element at "${selector}" did not become not visible`,
        waitPositive: `Element at "${selector}" did not become visible`,
      }
    );
  }

  public async getText(selector: string) {
    const element = await this.exists(selector);

    const properties = await element.getProperty('textContent');

    return properties.jsonValue();
  }

  public async getValue(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page');

    return this.page.evaluate((selectorParam) => {
      const element = document.querySelector(selectorParam);

      if (!element) return null;

      return element.value;
    }, selector);
  }

  public async text(condition: ICondition, selector: string, text: string) {
    let actualText: string;

    await conditional(
      condition,
      async () => {
        try {
          actualText = await this.getText(selector);

          return actualText === text;
        } catch (e) {
          return false;
        }
      },
      () => ({
        negative: `Text at "${selector}" is\n"${text}"\nExpected it not to be\n"${actualText}"`,
        positive: `Text at "${selector}" is not\n"${text}"Received\n"${actualText}"`,
        waitNegative: `Timeout waiting for text at "${selector}" to not be\n"${text}"\nLast value was\n"${actualText}"`,
        waitPositive: `Timeout waiting for text at "${selector}" to be\n"${text}"\nLast value was\n"${actualText}"`,
      })
    );
  }

  private async getElement(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.$(selector);
  }

  private async getElements(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.$$(selector);
  }

  private async ensurePage() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: this.nonHeadless ? false : headless,
      });
    }

    if (!this.page) {
      this.page = await this.browser.newPage();

      this.page.on('dialog', this.dialogOpen);
    }
  }

  public async addHook(id: string, type: string, nonHeadless: boolean) {
    this.nonHeadless = nonHeadless;

    this.hooks[id] = type;

    await this.setHooks();
  }

  public clearHooks() {
    this.hooks = {};
  }

  public async getCount(selector: string) {
    const element = await this.getElements(selector);

    if (!element) throw new Error(`Could not find elements at "${selector}"`);

    return element.length;
  }

  public async count(condition: ICondition, selector: string, value: number) {
    let actualCount: number;

    await conditional(
      condition,
      async () => {
        try {
          actualCount = await this.getCount(selector);

          return actualCount === value;
        } catch (e) {
          return false;
        }
      },
      () => ({
        negative: `Count at "${selector}" is\n"${value}"\nExpected it not to be\n"${actualCount}"`,
        positive: `Count at "${selector}" is not\n"${value}"Received\n"${actualCount}"`,
        waitNegative: `Timeout waiting for count at "${selector}" to not be\n"${value}"\nLast value was\n"${actualCount}"`,
        waitPositive: `Timeout waiting for count at "${selector}" to be\n"${value}"\nLast value was\n"${actualCount}"`,
      })
    );
  }

  public async press(selector: string) {
    await this.ensurePage();

    return new Promise((resolve, reject) => {
      this.dialogHandler = () => {
        resolve();
      };

      if (!this.page) throw new Error('No page object to click within');

      this.page
        .click(selector)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  }

  private dialogOpen(dialog: puppeteer.Dialog) {
    this.dialog = dialog;

    if (this.dialogHandler) this.dialogHandler(dialog);
  }

  private dialogAction(actionType: 'accept' | 'dismiss') {
    const { dialog } = this;
    this.dialog = undefined;

    if (!dialog) throw new Error('No dialog available');

    switch (actionType) {
      case 'accept':
        return dialog.accept();
      case 'dismiss':
        return dialog.dismiss();
      default:
        throw new Error('Cannot run action on dialog');
    }
  }

  public async alertVisible(condition: ICondition) {
    await conditional(condition, () => Promise.resolve(!!this.dialog), {
      negative: 'Alert is visible, expected it to be not visible',
      positive: 'Alert is not visible',
      waitNegative: 'Alert did not become not visible',
      waitPositive: 'Alert did not become visible',
    });
  }

  public async alertTextIs(text: string) {
    if (!this.dialog) throw new Error('No dialog to get the message from');

    const message = this.dialog.message();

    if (message !== text) {
      throw new Error(`Alert text is not "${text}", instead received "${message}"`);
    }

    return Promise.resolve();
  }

  public async pressAlertButton(button: number) {
    switch (button) {
      case 0:
        return this.dialogAction('dismiss');
      case 1:
        return this.dialogAction('accept');
      default:
        throw new Error('No alert button to press');
    }
  }

  public async dismissAlert() {
    try {
      const promise = this.dialogAction('dismiss');

      return promise;
    } catch (e) {
      return Promise.resolve();
    }
  }

  public async pressCoordinates(x: number, y: number) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.mouse.click(x, y);
  }

  public async pressBackButton() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.goBack();
  }

  public async focused(condition: ICondition, selector: string) {
    await this.ensurePage();

    await conditional(
      condition,
      () => {
        if (!this.page) throw new Error('No page');

        return this.page.evaluate((selectorParam) => {
          const element = document.querySelector(selectorParam);

          if (!element) return false;
          if (!document.activeElement) return false;

          return document.activeElement === element;
        }, selector);
      },
      {
        negative: `Element at "${selector}" is focused, expected it to be not focused`,
        positive: `Element at "${selector}" is not focused`,
        waitNegative: `Element at "${selector}" did not become not focused`,
        waitPositive: `Element at "${selector}" did not become focused`,
      }
    );
  }

  public async type(selector: string, text: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.type(selector, text);
  }

  public async value(condition: ICondition, selector: string, text: string) {
    let actualText: string;

    await conditional(
      condition,
      async () => {
        try {
          actualText = await this.getValue(selector);

          return actualText === text;
        } catch (e) {
          return false;
        }
      },
      () => ({
        negative: `Value at "${selector}" is\n"${text}"\nExpected it not to be\n"${actualText}"`,
        positive: `Value at "${selector}" is not\n"${text}"Received\n"${actualText}"`,
        waitNegative: `Timeout waiting for value at "${selector}" to not be\n"${text}"\nLast value was\n"${actualText}"`,
        waitPositive: `Timeout waiting for value at "${selector}" to be\n"${text}"\nLast value was\n"${actualText}"`,
      })
    );
  }

  public async disabled(condition: ICondition, selector: string) {
    await conditional(
      condition,
      async () => {
        if (!this.page) throw new Error('No page');

        return this.page.evaluate((selectorParam) => {
          const element = document.querySelector(selectorParam);

          if (!element) return false;

          return element.className.includes('disabled');
        }, selector);
      },
      () => ({
        negative: `Element at "${selector}" is disabled, expected it not to be disabled`,
        positive: `Element at "${selector}" is not disabled, expected it to be disabled`,
        waitNegative: `Timeout waiting for element at "${selector}" to not be disabled`,
        waitPositive: `Timeout waiting for element at "${selector}" to be disabled`,
      })
    );
  }

  public async clear(selector: string) {
    this.ensurePage();

    if (!this.page) throw new Error('No page');

    const cleared = await this.page.evaluate((selectorParam) => {
      const element = document.querySelector(selectorParam);

      if (!element) return false;

      element.value = '';

      return true;
    }, selector);

    if (!cleared) throw new Error('Could not get element to clear');

    // Needed to trigger the onchange event
    await this.type(selector, ' ');
    await this.page.keyboard.press('Backspace');
  }

  public async pressSubmitKey() {
    this.ensurePage();

    if (!this.page) throw new Error('No page');

    await this.page.keyboard.press('Enter');
  }

  public async closePage() {
    this.ensurePage();

    if (!this.page) throw new Error('No page to close');

    return this.page.close({ runBeforeUnload: true });
  }
}

export default Browser;
