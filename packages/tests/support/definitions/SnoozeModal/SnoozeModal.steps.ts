import { Then } from 'cucumber';
import snoozeModal from './SnoozeModal.page';

Then('the snooze reminder modal {string} visible', condiiton =>
  snoozeModal.visible(condiiton));

Then('the {string} snooze suggestion is pressed', suggestion =>
  snoozeModal.pressSuggestion(suggestion));
