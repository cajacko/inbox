import { After, AfterAll, Before, setDefaultTimeout } from 'cucumber';
import { LOG_ERRORS_AS_HAPPEN, LOG_IN_ERROR } from '../config/log';
import api from '../definitions/Api/Api.page';
import app from '../definitions/App/App.page';
import sync from '../definitions/Sync/Sync.page';
import driver from './driver';
import log, { getLogs, resetLogs } from './log';
import saveLogs from './saveLogs';
import { OnError } from './stepHooks';

setDefaultTimeout(10 * 1000);

OnError(async (testCase, error) => {
  try {
    await driver.dismissAlert();
  } catch (e) {
    // Nothing needed here
  }

  const appendPath = (key: string, path: string) => {
    // eslint-disable-next-line
    error.message = `${error.message}\n${key}: ${path}`;
  };

  const appendError = (key: string, e: Error) => {
    // eslint-disable-next-line
    error.message = `${error.message}\n${key}\n${e.message}`;
  };

  try {
    const screenshotPath = await app.errorScreenshot(testCase);
    appendPath('Error screenshot', screenshotPath);
  } catch (e) {
    appendError('Could not save error screenshot', e);
  }

  try {
    const logs = await driver.getLogs();
    const logPath = await saveLogs(testCase, logs);
    appendPath('Error console logs', logPath);
  } catch (e) {
    appendError('Could not save error logs', e);
  }

  if (LOG_IN_ERROR) {
    const logs = getLogs();

    let logMessage = '';

    logs.forEach((args) => {
      args.forEach((arg) => {
        logMessage = `${logMessage}\n${arg}`;
      });
    });

    if (logMessage !== '') {
      // eslint-disable-next-line
      error.message = `${error.message}\nTest logs:\n${logMessage}`;
    }
  }

  if (LOG_ERRORS_AS_HAPPEN) {
    // eslint-disable-next-line
    console.error(`\n${error.message}`);
    // eslint-disable-next-line
    console.error(`${error.stack}\n`);
  }

  return error;
});

Before(function (testCase) {
  log('BEFORE')();
  this.testCase = testCase;
  this.nonHeadless = !!testCase.pickle.tags.find(({ name }) => name === '@non-headless');
  sync.reset();

  return api.clearTestData();
});

const afterTimeout = 10000;

After({ timeout: afterTimeout }, async (testCase) => {
  const afterLog = log('AFTER');
  afterLog('Init');

  afterLog('Dismiss alert');
  await driver.dismissAlert();
  afterLog('Alert dismissed, clear hooks');

  driver.clearHooks();
  afterLog('Hooks cleared, clear logs');
  driver.clearLogs();
  afterLog('Logs cleared, wait for network idle');

  try {
    await driver.waitForNetworkIdle(afterTimeout - 2000);
  } catch (e) {
    afterLog('Network idle failed');
  }

  afterLog('Network idle, reset driver');

  await driver.reset();
  afterLog('Driver reset, reset logs');
  resetLogs();
  afterLog('Logs reset');
  afterLog('Done');
});

AfterAll(() => driver.close());