import { Then, When } from 'cucumber';
import getIndex from '../../utils/getIndex';
import reminderList from './ReminderList.page';

Then('the reminder list count {string} {string}', (conditional, value) =>
  reminderList.count(conditional, parseInt(value, 10)));

Then(
  'the text for the {string} reminder {string} {string}',
  (index, conditional, value) =>
    reminderList.text(conditional, getIndex(index), value)
);

Then(
  'the {string} reminder status {string} {string}',
  (index, conditional, status) =>
    reminderList.status(conditional, getIndex(index), status)
);

When('the we hover over the {string} reminder', index =>
  reminderList.hover(getIndex(index)));

When('the {string} reminder is pressed', index =>
  reminderList.press(getIndex(index)));

Then(
  'the {string} reminder {string} button {string} visible',
  (index, component, condition) =>
    reminderList.buttonVisible(condition, getIndex(index), component)
);

When(
  'the {string} reminder hover {string} button is pressed',
  (index, component) => reminderList.pressButton(getIndex(index), component)
);
