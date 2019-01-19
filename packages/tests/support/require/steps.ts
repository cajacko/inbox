// import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import app from '../pageObjects/App';
import errorComponent from '../pageObjects/ErrorComponent';
import splashScreen from '../pageObjects/SplashScreen';
import driver from '../utils/driver';
import ensureCondition from '../utils/ensureCondition';
import getIndex from '../utils/getIndex';

Given('the driver is ready', async () => app.open());

When('the app is navigated to {string}', async (route: string) =>
  app.navigate(route));

Then('the error component {string} visible', async (condition: string) =>
  errorComponent.visible(ensureCondition(condition)));

Then(
  'the error code {string} {string}',
  async (condition: string, code: string) =>
    errorComponent.code(ensureCondition(condition), code)
);

Then('the screenshot matches', async function () {
  // @ts-ignore
  const { testCase } = this;

  await app.screenshotMatches(testCase);
});

Given('we add a hook with id {string} and type {string}', (id, type) =>
  driver.addHook(id, type));

Then('the home route is visible', () =>
  errorComponent.code({ wait: false, positive: true }, '100-001'));

Then('the splash screen {string} visible', condition =>
  splashScreen.visible(ensureCondition(condition)));

Then('there are {string} error buttons', (count: string) =>
  errorComponent.count({ positive: true, wait: false }, parseInt(count, 10)));

Then('the {string} error button has the text {string}', (index, text) =>
  errorComponent.buttonText(
    { positive: true, wait: false },
    getIndex(index),
    text
  ));

When('the {string} error button is pressed', index =>
  errorComponent.pressButton(getIndex(index)));
