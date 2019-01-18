import { expect } from 'chai';
import * as puppeteer from 'puppeteer';

const shouldClose = true;
const headless = true;

declare global {
  // tslint:disable-next-line
  interface Window {
    hooks?: {
      [key: string]: (params: any) => any;
    };
  }
}

class Browser {
  private browser: null | puppeteer.Browser = null;
  private page: null | puppeteer.Page = null;
  private hooks = {};

  get platform() {
    return 'web';
  }

  public async open() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to do things with');
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

    await this.page.evaluate((hooks) => {
      window.hooks = {};

      if (!hooks) return;

      Object.keys(hooks).forEach((hook) => {
        if (!window.hooks) window.hooks = {};

        window.hooks[hook] = () => {
          throw new Error('Boo');
        };
      });
    }, this.hooks);

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

  public async isVisible(selector: string) {
    await this.ensurePage();

    if (!this.page) {
      throw new Error('No page object to check the elements visibility');
    }

    const isVisible = await this.page.evaluate((selectorParam) => {
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

    expect(isVisible).to.equal(true);
  }

  public async getText(selector: string) {
    // const element = await this.getElement(selector);
    const element = await this.exists(selector);

    if (!element) throw new Error('Element does not exist');

    const properties = await element.getProperty('textContent');

    return properties.jsonValue();
  }

  private async getElement(selector: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to get elements');

    return this.page.$(selector);
  }

  private async ensurePage() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless });
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
}

export default Browser;
