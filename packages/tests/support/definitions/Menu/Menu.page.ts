import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Menu {
  private menu = selectors.general.Menu;
  private buttonSelector = selectors.general.Menu.Button;
  private logoutButton = selectors.general.Menu.LogoutButton;
  private closeButton = selectors.general.Menu.CloseButton;
  private backgroundButton = selectors.general.Menu.BackgroundButton;
  private doneMenuItem = selectors.general.Menu.MenuItems.Done;
  private inboxMenuItem = selectors.general.Menu.MenuItems.Inbox;

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.menu));
  }

  public async pressButton() {
    return driver.press(getSelector(this.buttonSelector));
  }

  public async pressLogoutButton() {
    return driver.press(getSelector(this.logoutButton));
  }

  public async pressCloseButton() {
    return driver.press(getSelector(this.closeButton));
  }

  public async pressBackgroundButton() {
    return driver.press(getSelector(this.backgroundButton));
  }

  public async pressMenuItem(item: string) {
    const getMenuItem = () => {
      switch (item) {
        case 'done':
          return getSelector(this.doneMenuItem);
        case 'inbox':
          return getSelector(this.inboxMenuItem);
        default:
          throw new Error(`Unknown menu item given ${item}`);
      }
    };

    return driver.press(getMenuItem());
  }
}

export default new Menu();
