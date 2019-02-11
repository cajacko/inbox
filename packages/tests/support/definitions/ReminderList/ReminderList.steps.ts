import { Then } from 'cucumber';
import getIndex from '../../utils/getIndex';
import reminderList from './ReminderList.page';

Then('the reminder list count {string} {string}', (conditional, value) =>
  reminderList.count(conditional, parseInt(value, 10)));

Then(
  'the text for the {string} reminder {string} {string}',
  (index, conditional, value) =>
    reminderList.text(conditional, getIndex(index), value)
);
