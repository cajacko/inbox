import { Then } from 'cucumber';
import addReminder from './AddReminder.page';

Then('the add reminder scene {string} visible', condition =>
  addReminder.visible(condition));
