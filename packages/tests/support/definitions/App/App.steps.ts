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

Then(/the screenshot matches(.*)/, async function (params) {
  // @ts-ignore
  const { testCase } = this;

  await app.screenshotMatches(testCase, params);
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

When('we set the network as {string}', type =>
  driver.setOffline(type === 'offline'));

When('we remove the hook with id {string}', function (id) {
  // @ts-ignore
  const { nonHeadless } = this;

  return driver.removeHook(id, nonHeadless);
});

Given(/we set the time to (.*)/, function (time) {
  // @ts-ignore
  const { nonHeadless } = this;

  const date = new Date(2019, 2, 4, 5, 0, 0);
  let hour;

  switch (time) {
    case 'beforeMorning':
      hour = 4;
      break;
    case 'beforeAfternoon':
      hour = 11;
      break;
    case 'beforeEvening':
      hour = 16;
      break;
    case 'afterEvening':
      hour = 21;
      break;
    default:
      throw new Error(`Day does not exist ${hour}`);
  }

  date.setHours(hour);

  return driver.setDate(date.getTime(), nonHeadless);
});

Given(/we set the day to (.*)/, function (day) {
  // @ts-ignore
  const { nonHeadless } = this;

  const date = new Date(2019, 2, 4, 5, 0, 0);
  let add;

  switch (day) {
    case 'monday':
      add = 0;
      break;
    case 'tuesday':
      add = 1;
      break;
    case 'wednesday':
      add = 2;
      break;
    case 'thursday':
      add = 3;
      break;
    case 'friday':
      add = 4;
      break;
    case 'saturday':
      add = 5;
      break;
    case 'sunday':
      add = 6;
      break;
    default:
      throw new Error(`Day does not exist ${day}`);
  }

  date.setDate(date.getDate() + add);

  return driver.setDate(date.getTime(), nonHeadless);
});
