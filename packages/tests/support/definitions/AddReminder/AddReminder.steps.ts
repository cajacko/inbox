import { Then, When } from 'cucumber';
import addReminder from './AddReminder.page';

Then('the add reminder scene {string} visible', condition =>
  addReminder.visible(condition));

When('the add reminder cancel button is pressed', () =>
  addReminder.pressCancelButton());

Then('the add reminder text input {string} focussed', condition =>
  addReminder.inputFocused(condition));
