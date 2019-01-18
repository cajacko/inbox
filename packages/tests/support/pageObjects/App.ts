import { HookScenarioResult } from 'cucumber';
import { ensureFile } from 'fs-extra';
import driver from '../utils/driver';
import getScreenshotPath from '../utils/getScreenshotPath';

class App {
  public async open() {
    await driver.open();
  }

  public async navigate(route: string) {
    await driver.navigate(route);
  }

  public async screenshotMatches(world: HookScenarioResult) {
    return this.screenshot(world);
  }

  private async screenshot(world: HookScenarioResult) {
    const path = getScreenshotPath(world, driver.platform);

    await ensureFile(path);

    await driver.screenshot(path);
  }

  public async close() {
    await driver.close();
  }
}

export default new App();
