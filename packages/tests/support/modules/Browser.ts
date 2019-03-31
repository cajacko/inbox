/* eslint max-lines: 0 */
import * as puppeteer from 'puppeteer';
import browserSizes from '../config/browserSizes';
import hookConstants from '../config/hookConstants';
import browserHooks from '../utils/browserHooks';
import conditional from '../utils/conditional';
import { ICondition } from '../utils/ensureCondition';
import getSize from '../utils/getSize';
import log from '../utils/log';

const showBrowser = false;
const shouldClose = !showBrowser;
const headless = !showBrowser;

type FinishedResponse = 'SUCCESS' | 'ERROR';
type Response = 'INIT' | FinishedResponse;

interface INetworkListenerAdditionalParams {
  status: number | null;
}

type NetworkListener = (
  url: string,
  response: Response,
  additionalParams: INetworkListenerAdditionalParams
) => void;

export interface ILogs {
  console: any[];
  logger: any[];
}

// eslint-disable-next-line id-length
type ResolveWaitForNetworkIdle = (error?: Error) => void;

class Browser {
  private browser: null | puppeteer.Browser = null;
  private page: null | puppeteer.Page = null;
  private hooks: { [key: string]: string } = {};
  private interceptingRequests: boolean = false;
  private dialogHandler?: (dialog: puppeteer.Dialog) => void;
  private dialog?: puppeteer.Dialog;
  private nonHeadless: boolean = false;
  private headless: boolean;
  private logs: ILogs = {
    console: [],
    logger: [],
  };
  private networkListenerId: number = 0;
  private networkListeners: { [key: string]: NetworkListener } = {};
  private inflight: number = 0;
  private resolveWaitForNetworkIdle: ResolveWaitForNetworkIdle | null = null;
  private pageId: number = 0;
  private hookValues: { [key: string]: any } = {};

  constructor() {
    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogAction = this.dialogAction.bind(this);
    this.captureConsole = this.captureConsole.bind(this);
  }

  get platform() {
    return 'web';
  }

  public clearLogs() {
    this.logs = {
      console: [],
      logger: [],
    };
  }

  public async reset() {
    this.networkListeners = {};

    if (!this.page) return;

    if (shouldClose && !this.page.isClosed()) {
      try {
        await this.page.close();
      } catch (e) {
        // Dont need to do anything here
      }
    }

    this.clearPage();
  }

  public async open(nonHeadless: boolean) {
    this.nonHeadless = nonHeadless;

    await this.ensurePage();

    if (!this.page) throw new Error('No page object to do things with');

    await this.page.setViewport(browserSizes[getSize()]);
    await this.setJavaScriptEnabled();
    await this.setRequestInterception();
    await this.setRequestListeners();
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
    const navigateLog = log('NAVIGATE');

    navigateLog('init');

    await this.ensurePage();

    navigateLog('has page, navigate');

    const goToPromise = new Promise((resolve, reject) => {
      if (!this.page) throw new Error('No page object to navigate within');

      this.page.goto(`http://localhost:3000${route}?test-env=true`, {
        waitUntil: 'domcontentloaded',
      }).then(() => resolve());

      navigateLog('navigating, start timeout');

      setTimeout(() => {
        navigateLog('navigating timed out, is the alert showing?');
        reject(new Error('Timeout whilst navigating, there may be an alert preventing navigation'));
      }, 1000);
    });

    navigateLog('navigating, wait for load');

    const pageLoadPromise = new Promise((resolve) => {
      if (!this.page) throw new Error('No page object to check for load');

      this.page.once('load', () => {
        navigateLog('loaded, wait a little bit');
        // Give the js a bit of time to do something after load
        setTimeout(resolve, 100);
      });
    });

    navigateLog('wait for navigate');

    await goToPromise;

    navigateLog('successfully navigated, setting hooks');

    await this.setHooks();

    navigateLog('set hooks, now wait for load');

    await pageLoadPromise;

    navigateLog('Loaded, all done');
  }

  public async setHooks() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to set hooks within');

    await this.page.evaluate(browserHooks, this.hooks, hookConstants(this.hookValues));
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

  public async visible(
    condition: ICondition,
    selector: string,
    waitTimeout?: number
  ) {
    await this.ensurePage();

    const visibleLog = log('VISIBLE');

    visibleLog('Browser -> visible -> init');

    await conditional(
      condition,
      () => {
        visibleLog('Browser -> visible -> testFunc');

        if (!this.page) {
          visibleLog('Browser -> visible -> testFunc -> no page');
          throw new Error('No page object to check the elements visibility');
        }

        visibleLog('Browser -> visible -> testFunc -> run');
        return this.page
          .evaluate((selectorParam) => {
            const element = document.querySelector(selectorParam);

            if (!element) return false;

            const style = window.getComputedStyle(element);

            return (
              style &&
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              style.opacity !== '0'
            );
          }, selector)
          .then((res) => {
            visibleLog('Browser -> visible -> testFunc -> resolved');
            visibleLog(res);

            return res;
          })
          .catch((e) => {
            visibleLog('Browser -> visible -> testFunc -> catch');
            visibleLog(e);

            throw e;
          });
      },
      {
        negative: `Element at "${selector}" is visible, expected it to be not visible`,
        positive: `Element at "${selector}" is not visible`,
        waitNegative: `Element at "${selector}" did not become not visible`,
        waitPositive: `Element at "${selector}" did not become visible`,
      },
      waitTimeout
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
    const finalHeadless = this.nonHeadless ? false : headless;

    if (!this.browser || this.headless !== finalHeadless) {
      this.headless = finalHeadless;

      if (this.browser) await this.browser.close();

      this.browser = await puppeteer.launch({
        headless: this.headless,
      });

      if (this.page && !this.page.isClosed()) {
        await this.page.close();
      }

      this.clearPage();
    }

    if (!this.page || this.page.isClosed()) {
      this.pageId += 1;

      const thisPageId = this.pageId;
      this.page = await this.browser.newPage();

      if (this.resolveWaitForNetworkIdle) {
        this.resolveWaitForNetworkIdle(new Error('Creating a new page, but something is waiting for the network to be idle'));
      }

      this.inflight = 0;

      this.page.on('dialog', this.dialogOpen);
      this.page.on('console', this.captureConsole);

      this.page.on('request', () => {
        if (thisPageId !== this.pageId) return;
        this.inflight += 1;
      });

      const onRequestFinished = () => {
        if (thisPageId !== this.pageId) return;

        this.inflight = this.inflight === 0 ? 0 : this.inflight - 1;

        if (this.inflight === 0 && this.resolveWaitForNetworkIdle) {
          this.resolveWaitForNetworkIdle();
        }
      };

      this.page.on('requestfinished', onRequestFinished);
      this.page.on('requestfailed', onRequestFinished);

      // Reset the mouse, as puppeteer seems to have it in the middle of the
      // page causing hovering effects
      await this.resetMouse();
    }
  }

  public async addHook(id: string, type: string, nonHeadless: boolean) {
    this.nonHeadless = nonHeadless;

    this.hooks[id] = type;

    await this.setHooks();
  }

  public async removeHook(id: string, nonHeadless: boolean) {
    this.nonHeadless = nonHeadless;

    delete this.hooks[id];

    await this.setHooks();
  }

  public clearHooks() {
    this.hooks = {};
    this.hookValues = {};
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
    })
      .catch(e => e)
      .then((e) => {
        if (!this.page) throw new Error('No page object to reset the mouse');

        // Reset the mpuse after all click events, or the mouse will stay where
        // last clicked
        return this.resetMouse().then(() => e);
      })
      .then((e) => {
        if (e) throw e;
      });
  }

  private async resetMouse() {
    this.ensurePage();

    if (!this.page) throw new Error('No page object to reset the mouse');

    await this.page.mouse.move(100, 0);
    await this.page.mouse.up();
  }

  private dialogOpen(dialog: puppeteer.Dialog) {
    this.dialog = dialog;

    if (this.dialogHandler) this.dialogHandler(dialog);
  }

  private async dialogAction(actionType: 'accept' | 'dismiss') {
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

      return promise.catch(() => Promise.resolve());
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
    await this.ensurePage();

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
    await this.ensurePage();

    if (!this.page) throw new Error('No page');

    await this.page.keyboard.press('Enter');
  }

  public async closePage(clear: boolean) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to close');

    await this.page.close({ runBeforeUnload: true });

    this.inflight = 0;
    // eslint-disable-next-line id-length
    this.resolveWaitForNetworkIdle = null;

    if (clear) {
      this.clearPage();
    }
  }

  public async hover(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to hover on');

    return this.page.hover(selector);
  }

  public async scrollToBottom(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to scroll');

    const error = await this.page.evaluate((selectorParam) => {
      const element = document.querySelector(selectorParam);

      if (!element) return 'No element found to scroll';

      element.scrollTop = element.scrollHeight;

      return null;
    }, selector);

    if (error) throw new Error(error);
  }

  private captureConsole(msg: puppeteer.ConsoleMessage) {
    this.logs.console.push({
      args: msg.args().map((arg) => {
        try {
          // TODO: This returns a promise, need to resolve these to string at
          // point
          return arg.jsonValue();
        } catch (e) {
          try {
            return JSON.stringify(arg);
          } catch (error) {
            return String(arg);
          }
        }
      }),
      text: msg.text(),
      type: msg.type(),
    });
  }

  public async getLogs() {
    if (this.page) {
      // @ts-ignore
      const logs = await this.page.evaluate(() => window.logs);
      this.logs.logger = logs;
    }

    return this.logs;
  }

  public async reload() {
    this.ensurePage();

    if (!this.page) throw new Error('No page to reload');

    await this.page.reload();
    await this.setHooks();
  }

  public networkListener(func: (
    url: string,
    response: Response,
    additionalParams: INetworkListenerAdditionalParams
  ) => void) {
    const id = `network-listener-id-${this.networkListenerId}`;
    this.networkListenerId += 1;

    this.networkListeners[id] = func;

    return () => {
      delete this.networkListeners[id];
    };
  }

  private setRequestListeners() {
    this.ensurePage();

    if (!this.page) throw new Error('No page to listen to');

    const setRequestStatus = (type: Response) => (request: puppeteer.Request) => {
      Object.values(this.networkListeners).forEach((listener) => {
        const response = request.response();
        const status = response ? response.status() : null;

        let responseType: Response;

        if (type === 'INIT' || (status && status < 300)) {
          responseType = type;
        } else {
          responseType = 'ERROR';
        }

        listener(request.url(), responseType, {
          status,
        });
      });
    };

    this.page.on('request', setRequestStatus('INIT'));
    this.page.on('requestfinished', setRequestStatus('SUCCESS'));
    this.page.on('requestfailed', setRequestStatus('ERROR'));
  }

  public async getIdToken() {
    this.ensurePage();

    if (!this.page) throw new Error('No page to get the token from');

    // @ts-ignore
    return this.page.evaluate(() => {
      // @ts-ignore
      if (window.idToken) {
        // @ts-ignore
        return window.idToken();
      }

      return null;
    });
  }

  public async setIdToken(token: string) {
    this.ensurePage();

    if (!this.page) throw new Error('No page to get the token from');

    // @ts-ignore
    return this.page.evaluate((idToken) => {
      // @ts-ignore
      if (window.dispatch) {
        // @ts-ignore
        return window.dispatch({ type: 'SET_ID_TOKEN', payload: { idToken } });
      }

      return null;
    }, token);
  }

  public async waitForNetworkIdle(timeoutVal: number) {
    return new Promise((resolve, reject) => {
      if (this.inflight === 0 || !this.page) {
        // eslint-disable-next-line id-length
        this.resolveWaitForNetworkIdle = null;
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        reject(new Error(`waitForNetworkIdle timed out with ${this.inflight} requests left`));
      }, timeoutVal);

      // eslint-disable-next-line id-length
      this.resolveWaitForNetworkIdle = (error) => {
        if (!timeout) return;

        clearTimeout(timeout);

        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };
    });
  }

  private clearPage() {
    this.page = null;
    this.inflight = 0;
    // eslint-disable-next-line id-length
    this.resolveWaitForNetworkIdle = null;
    this.pageId += 1;
  }

  public async getRoute() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to get route for');

    return this.page.url();
  }

  public async setOffline(offline: boolean) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to set offline');

    return this.page.setOfflineMode(offline);
  }

  public async setDate(time: number, nonHeadless: boolean) {
    this.hookValues.now = time;
    await this.addHook('now', 'value', nonHeadless);
  }

  public async scrollIntoView(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page to scroll');

    const error = await this.page.evaluate((selectorParam) => {
      const element = document.querySelector(selectorParam);

      if (!element) return 'No element found to scroll';

      element.scrollIntoView();

      return null;
    }, selector);

    if (error) throw new Error(error);
  }
}

export default Browser;
