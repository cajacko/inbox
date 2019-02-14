import { Then } from 'cucumber';
import header from './Header.page';

Then('the header loading icon {string} visible', conditional =>
  header.loadingVisible(conditional));

Then('the header error button {string} visible', conditional =>
  header.errorVisible(conditional));
