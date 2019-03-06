import { Then, When } from 'cucumber';
import snoozeModal from './SnoozeModal.page';

Then('the snooze reminder modal {string} visible', condiiton =>
  snoozeModal.visible(condiiton));

Then('the {string} snooze suggestion is pressed', suggestion =>
  snoozeModal.pressSuggestion(suggestion));

Then('the snooze custom date scene {string} visible', condition =>
  snoozeModal.calendarVisible(condition));

When('the snooze scene custom date button is pressed', () =>
  snoozeModal.pressCustomDate());
