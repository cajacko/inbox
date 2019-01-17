import { expect } from 'chai';
import * as puppeteer from 'puppeteer';

class Browser {
  private browser: null | puppeteer.Browser;
  private page: null | puppeteer.Page;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  get platform() {
    return 'web';
  }

  public async open() {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to do things with');
  }

  public async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async navigate(route: string) {
    await this.ensurePage();

    if (!this.page) throw new Error('No page object to navigate within');

    await this.page.goto(`http://localhost:3000${route}`);
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
      this.browser = await puppeteer.launch();
    }

    if (!this.page) {
      this.page = await this.browser.newPage();
    }
  }
}

export default Browser;
