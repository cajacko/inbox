import { Given, Then, When } from 'cucumber';
import driver from '../../utils/driver';
import app from './App.page';

Given('the driver is ready', async function () {
  // @ts-ignore
  const { nonHeadless } = this;

  return app.open(nonHeadless);
});

When('the app is navigated to {string}', async (route: string) =>
  app.navigate(route));

Then('the screenshot matches', async function () {
  // @ts-ignore
  const { testCase } = this;

  await app.screenshotMatches(testCase);
});

Given('we add a hook with id {string} and type {string}', function (id, type) {
  // @ts-ignore
  const { nonHeadless } = this;

  return driver.addHook(id, type, nonHeadless);
});

When('the device back button is pressed', () => driver.pressBackButton());

When('the keyboard submit button is pressed', () => driver.pressSubmitKey());

When('the close browser tab button is pressed', () => driver.closePage(false));

When('we reload the app', () => driver.reload());
