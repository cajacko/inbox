import { HookScenarioResult } from 'cucumber';
import * as fs from 'fs';
import { ensureFile, pathExists, remove } from 'fs-extra';
import { PNG } from 'pngjs';
import driver from '../../utils/driver';
import getScreenshotPath from '../../utils/getScreenshotPath';

// tslint:disable-next-line
const pixelmatch = require('pixelmatch');

class App {
  public async open(nonHeadless: boolean) {
    await driver.open(nonHeadless);
  }

  public async navigate(route: string) {
    await driver.navigate(route);
  }

  public async errorScreenshot(world: HookScenarioResult) {
    const path = getScreenshotPath(world, driver.platform);
    const errorPath = path.replace('/screenshots/', '/errorShots/');

    await this.screenshot(errorPath);
    // eslint-disable-next-line
    console.log(`\nSaved an error shot at:\n${errorPath}`);
  }

  public async screenshotMatches(world: HookScenarioResult) {
    const existingPath = getScreenshotPath(world, driver.platform);
    const newPath = existingPath.replace('.png', '.new.png');
    const diffPath = existingPath.replace('.png', '.diff.png');

    const shouldUpdate =
      process.argv.includes('-u') ||
      process.argv.includes('--update-screenshots') ||
      process.env.NODE_ENV === 'update';

    const screenshotExists = await pathExists(existingPath);

    if (!screenshotExists || shouldUpdate) {
      await this.screenshot(existingPath);
      this.clearImages(newPath, diffPath);
      return;
    }

    await this.screenshot(newPath);

    const isDiff = await this.diffImages(existingPath, newPath, diffPath);

    if (isDiff) {
      throw new Error(`Screenshots differ check the following images:\n${existingPath}\n${newPath}\n${diffPath}\n\nIf these changes are acceptable, update the snapshots with "NODE_ENV=update yarn test:..." or the "-u" or "--update-snapshots" flags`);
    }

    this.clearImages(newPath, diffPath);
  }

  private async diffImages(
    path1: string,
    path2: string,
    saveDiffToPath: string
  ) {
    type PromiseType = Promise<{ width: number; height: number; data: any }>;

    const getImg = (path: string): PromiseType =>
      new Promise((resolve) => {
        const img: any = fs
          .createReadStream(path)
          .pipe(new PNG())
          .on('parsed', () =>
            resolve({ width: img.width, height: img.height, data: img.data }));
      });

    return Promise.all([getImg(path1), getImg(path2)]).then(([img1, img2]) => {
      const diff = new PNG({ width: img1.width, height: img1.height });

      const pixelDiff = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        {
          threshold: 0.1,
        }
      );

      diff.pack().pipe(fs.createWriteStream(saveDiffToPath));

      return !!pixelDiff;
    });
  }

  private async screenshot(path: string) {
    await ensureFile(path);

    await driver.screenshot(path);
  }

  private async clearImages(...paths: string[]) {
    return Promise.all(paths.map(path => remove(path).catch()));
  }

  public async close() {
    await driver.close();
  }
}

export default new App();
