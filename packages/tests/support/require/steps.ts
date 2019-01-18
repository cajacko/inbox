// import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import app from '../pageObjects/App';
import errorComponent from '../pageObjects/ErrorComponent';
import driver from '../utils/driver';

Given('the driver is ready', async () => app.open());

When('the app is navigated to {string}', async (route: string) =>
  app.navigate(route));

Then('the error component is visible', async () => errorComponent.isVisible());

Then('the error code is {string}', async (code: string) =>
  errorComponent.codeIs(code));

Then('the screenshot matches', async function () {
  // @ts-ignore
  const { testCase } = this;

  await app.screenshotMatches(testCase);
});

Given('we have told the app to crash at the root', () =>
  driver.addHook('root', 'crash'));
