import { After, AfterAll, Before, setDefaultTimeout } from 'cucumber';
import app from '../pageObjects/App';
import driver from '../utils/driver';

setDefaultTimeout(10 * 1000);

Before(function (testCase) {
  this.testCase = testCase;
});

After(async (testCase) => {
  await driver.dismissAlert();

  if (testCase.result.status === 'failed') {
    await app.errorScreenshot(testCase);
  }

  driver.clearHooks();

  await driver.reset();
});

AfterAll(() => driver.close());
