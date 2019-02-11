import { Then, When } from 'cucumber';
import addReminder from './AddReminder.page';

Then('the add reminder scene {string} visible', condition =>
  addReminder.visible(condition));

When('the add reminder cancel button is pressed', () =>
  addReminder.pressCancelButton());

Then('the add reminder text input {string} focussed', condition =>
  addReminder.inputFocused(condition));

When('the text {string} is typed into the add reminder input', text =>
  addReminder.type(text));

Then('the add reminder text {string} {string}', (condition, text) =>
  addReminder.textIs(condition, text));
