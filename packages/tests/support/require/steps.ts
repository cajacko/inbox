import { Given, Then, When } from 'cucumber';
import app from '../pageObjects/App';
import errorComponent from '../pageObjects/ErrorComponent';
import googleAuth from '../pageObjects/GoogleAuth';
import login from '../pageObjects/Login';
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

Then('the {string} home route is visible', (type: string) =>
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

When('the login button is pressed', () => login.pressLoginButton());

When('the login details are entered', () => googleAuth.typeCredentials());

When('the Google login submit button is pressed', () => googleAuth.submit());

Then('the login scene {string} visible', conditional =>
  login.visible(conditional));

Then('the login error text {string} {string}', (conditional, text) =>
  login.errorText(conditional, text));

Then('the login button {string} visible', conditional =>
  login.buttonVisible(conditional));

Then('the app logo {string} visible', conditional =>
  login.appLogoVisible(conditional));

Then('the app version matches the expected version', () =>
  login.versionMatches());
