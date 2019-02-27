import { Given, Then, When } from 'cucumber';
import driver from '../../utils/driver';
import ensureCondition from '../../utils/ensureCondition';
import logHOC from '../../utils/log';
import app from '../App/App.page';
import home from '../Home/Home.page';
import splashScreen from '../SplashScreen/SplashScreen.page';
import login from './Login.page';

const log = logHOC('LOGIN');

When('the login button is pressed', () => login.pressLoginButton());

Then('the login scene {string} visible', conditional =>
  login.visible(conditional));

Then('the login error text {string} {string}', (conditional, text) =>
  login.errorText(conditional, text));

Then('the login button {string} visible', conditional =>
  login.buttonVisible(conditional));

Then('the login title {string} visible', conditional =>
  login.titleVisible(conditional));

Then('the app version matches the expected version', () =>
  login.versionMatches());

When('the login cancel button is pressed', () => login.pressCancelButton());

Then('the login cancel button {string} visible', conditional =>
  login.cancelVisible(conditional));

Then('the login loading icon {string} visible', conditional =>
  login.loadingVisible(conditional));

Given('we have logged in successfully', function () {
  // @ts-ignore
  const { nonHeadless } = this;

  const logWrap = (message: string, callback: () => Promise<any>) => () => {
    log(`INIT -> ${message}`);

    return Promise.resolve(callback())
      .then((res) => {
        log(`SUCCESS -> ${message}`);
        return res;
      })
      .catch((e) => {
        log(`ERROR -> ${message}`);
        throw e;
      });
  };

  return (
    driver
      .addHook('login', 'success', nonHeadless)
      .then(logWrap('OPEN', () => app.open(nonHeadless)))
      .then(logWrap('NAVIGATE TO /', () => app.navigate('/')))
      // Kept on getting a home did not become visible error, when checking the
      // screenshot it just showed the login view without any loading or error
      // message. Which makes it seem like the button hasn't actually been
      // pressed. However the press button action passes. But it could be that the
      // element exists on the page but is behind the splash screen. So now we
      // ensure the splash screen is not there and the login view is properly
      // visible.
      .then(logWrap('SPLASH SCREEN WILL NOT BE VISIBLE', () =>
        splashScreen.visible(ensureCondition('will not be'))))
      .then(logWrap('LOGIN WILL BE VISIBLE', () =>
        login.visible(ensureCondition('will be'))))
      .then(logWrap('PRESS LOGIN BUTTON', () => login.pressLoginButton()))
      .then(logWrap('HOME VISIBLE', () => home.visible(ensureCondition('will be'))))
  );
});

When('we have relogged in successfully', function () {
  // @ts-ignore
  const { nonHeadless } = this;

  const logWrap = (message: string, callback: () => Promise<any>) => () => {
    log(`INIT -> ${message}`);

    return Promise.resolve(callback())
      .then((res) => {
        log(`SUCCESS -> ${message}`);
        return res;
      })
      .catch((e) => {
        log(`ERROR -> ${message}`);
        throw e;
      });
  };

  return driver
    .addHook('login', 'success', nonHeadless)
    .then(logWrap('PRESS LOGIN BUTTON', () => login.pressLoginButton()))
    .then(logWrap('HOME VISIBLE', () => home.visible(ensureCondition('will be'))));
});

Then('the relogin scene {string} visible', conditional =>
  login.reloginVisible(conditional));
