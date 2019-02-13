import { Given, Then, When } from 'cucumber';
import driver from '../../utils/driver';
import ensureCondition from '../../utils/ensureCondition';
import app from '../App/App.page';
import home from '../Home/Home.page';
import login from './Login.page';

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

Given('we have logged in successfully', () => {
  // @ts-ignore
  const { nonHeadless } = this;

  return driver
    .addHook('login', 'success', nonHeadless)
    .then(() => app.open(nonHeadless))
    .then(() => app.navigate('/'))
    .then(() => login.pressLoginButton())
    .then(() => home.visible(ensureCondition('will be')));
});
