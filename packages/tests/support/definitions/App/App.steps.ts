import { Given, Then, When } from 'cucumber';
import driver from '../../utils/driver';
import app from './App.page';

Given('the driver is ready', async () => app.open());

When('the app is navigated to {string}', async (route: string) =>
  app.navigate(route));

Then('the screenshot matches', async function () {
  // @ts-ignore
  const { testCase } = this;

  await app.screenshotMatches(testCase);
});

Given('we add a hook with id {string} and type {string}', (id, type) =>
  driver.addHook(id, type));
