// import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import app from '../pageObjects/App';
import errorComponent from '../pageObjects/errorComponent';

Given('the app is open', async () => app.open());

When('we navigate to {string}', async (route: string) => app.navigate(route));

Then('the error component is visible', async () => errorComponent.isVisible());

Then('the error code is {string}', async (code: string) =>
  errorComponent.codeIs(code));

Then('the screenshot matches', async function () {
  // @ts-ignore-next-line
  await app.screenshot(this.testCase);
});
