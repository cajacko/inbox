import { Then, When } from 'cucumber';
import getIndex from '../../utils/getIndex';
import link from './Link.page';

Then(
  /the "(.+?)" reminder link visibility "(.+?)" (true|false)/,
  (index, condition, value) => link.visible(getIndex(index), condition, value)
);

Then(/the "(.+?)" reminder link "(.+?)" (.*)/, (index, condition, value) =>
  link.linkIs(getIndex(index), condition, value));

When('we tap on the {string} reminder link', index =>
  link.tapLink(getIndex(index)));
