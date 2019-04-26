import { Then, When } from 'cucumber';
import repeatModal from './RepeatModal.page';

Then('the repeat modal {string} visible', conditional =>
  repeatModal.visible(conditional));

When('the repeat suggestions button is pressed', () =>
  repeatModal.pressSuggestions());

When('the repeat suggestions {string} button is pressed', suggestion =>
  repeatModal.pressRepeatSuggestion(suggestion));
