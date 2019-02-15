import { After, AfterAll, Before, setDefaultTimeout } from 'cucumber';
import api from '../definitions/Api/Api.page';
import app from '../definitions/App/App.page';
import driver from './driver';
import log from './log';

setDefaultTimeout(10 * 1000);

Before(function (testCase) {
  log('BEFORE')();
  this.testCase = testCase;
  this.nonHeadless = !!testCase.pickle.tags.find(({ name }) => name === '@non-headless');

  return api.clearTestData();
});

After(async (testCase) => {
  log('AFTER')();

  await driver.dismissAlert();

  if (testCase.result.status === 'failed') {
    await app.errorScreenshot(testCase);
  }

  driver.clearHooks();

  await driver.reset();
});

AfterAll(() => driver.close());
