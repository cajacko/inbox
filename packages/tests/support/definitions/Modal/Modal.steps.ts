import { When } from 'cucumber';
import modal from './Modal.page';

When('the modal background button is pressed', () =>
  modal.pressBackgroundButton());
