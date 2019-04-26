import { Then, When } from 'cucumber';
import getIndex from '../../utils/getIndex';
import datePicker from '../DatePicker/DatePicker.page';
import reminderList from '../ReminderList/ReminderList.page';
import snoozeModal from '../SnoozeModal/SnoozeModal.page';
import repeatModal from './RepeatModal.page';

Then('the repeat modal {string} visible', conditional =>
  repeatModal.visible(conditional));

When('the repeat suggestions button is pressed', () =>
  repeatModal.pressSuggestions());

When('the repeat suggestions {string} button is pressed', suggestion =>
  repeatModal.pressRepeatSuggestion(suggestion));

When('we repeat the {string} reminder {string}', (index, repeatSuggestion) => {
  let suggestion: string;

  switch (repeatSuggestion) {
    case 'every day':
      suggestion = 'daily';
      break;

    default:
      throw new Error(`Could not find suggestion for "${repeatSuggestion}"`);
  }

  return reminderList
    .hover(getIndex(index))
    .then(() => reminderList.pressButton(getIndex(index), 'repeat'))
    .then(() => repeatModal.pressSuggestions())
    .then(() => repeatModal.pressRepeatSuggestion(suggestion))
    .then(() => datePicker.pressDay(8))
    .then(() => snoozeModal.pressSave());
});
