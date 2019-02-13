import { Then, When } from 'cucumber';
import menu from './Menu.page';

When('the menu button is pressed', () => menu.pressButton());

Then('the menu {string} visible', conditional => menu.visible(conditional));

When('the menu close button is pressed', () => menu.pressCloseButton());

When('the logout button is pressed', () => menu.pressLogoutButton());

When('the menu background button is pressed', () =>
  menu.pressBackgroundButton());
