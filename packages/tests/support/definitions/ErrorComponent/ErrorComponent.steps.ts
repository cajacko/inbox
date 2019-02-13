import { Then, When } from 'cucumber';
import ensureCondition from '../../utils/ensureCondition';
import getIndex from '../../utils/getIndex';
import errorComponent from './ErrorComponent.page';

Then('the error component {string} visible', async (condition: string) =>
  errorComponent.visible(ensureCondition(condition)));

Then(
  'the error code {string} {string}',
  async (condition: string, code: string) =>
    errorComponent.code(ensureCondition(condition), code)
);

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
