import { Then, When } from 'cucumber';
import getIndex from '../../utils/getIndex';
import alert from './Alert.page';

Then('an alert {string} visible', conditional => alert.visible(conditional));

Then('the alert says {string}', text => alert.textIs(text));

When('the alert {string} button is pressed', button =>
  alert.pressButton(getIndex(button)));
