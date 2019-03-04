import { Then } from 'cucumber';
import snoozeModal from './SnoozeModal.page';

Then('the snooze reminder modal {string} visible', condiiton =>
  snoozeModal.visible(condiiton));
