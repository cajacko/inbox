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
}

export default new Menu();
