/* eslint max-lines: 0 */
import { expect } from 'chai';
import * as puppeteer from 'puppeteer';
import browserHooks from '../utils/browserHooks';
import conditional from '../utils/conditional';
import { ICondition } from '../utils/ensureCondition';

const showBrowser = false;
const shouldClose = !showBrowser;
const headless = !showBrowser;

class Browser {
  private browser: null | puppeteer.Browser = null;
  private page: null | puppeteer.Page = null;
  private hooks: { [key: string]: string } = {};
  private interceptingRequests: boolean = false;

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

  public async open() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to do things with');

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

    await this.page.evaluate(browserHooks, this.hooks);

    await pageLoadPromise;
  }

  public async screenshot(path: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to take a screenshot with');

    await this.page.screenshot({ path });
  }

  public async exists(selector: string) {
    const element = await this.getElement(selector);

    expect(element).not.to.equal(null);

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
    // const element = await this.getElement(selector);
    const element = await this.exists(selector);

    if (!element) throw new Error('Element does not exist');

    const properties = await element.getProperty('textContent');

    return properties.jsonValue();
  }

  public async text(condition: ICondition, selector: string, text: string) {
    let actualText: string;

    await conditional(
      condition,
      async () => {
        actualText = await this.getText(selector);

        return actualText === text;
      },
      () => ({
        negative: `Text at "${selector}" is "${text}", expected it not to be "${actualText}"`,
        positive: `Text at "${selector}" is not "${text}", received "${actualText}"`,
        waitNegative: `Timeout waiting for text at "${selector}" to not be "${text}", last value was "${actualText}"`,
        waitPositive: `Timeout waiting for text at "${selector}" to be "${text}", last value was "${actualText}"`,
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
        headless,
      });
    }

    if (!this.page) {
      this.page = await this.browser.newPage();
    }
  }

  public addHook(id: string, type: string) {
    this.hooks[id] = type;
  }

  public clearHooks() {
    this.hooks = {};
  }

  public async getCount(selector: string) {
    const element = await this.getElements(selector);

    if (!element) throw new Error(`Could not find elements at "${selector}"`);

    return element.length;
  }

  public async press(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to click within');

    await this.page.click(selector);
  }
}

export default Browser;
