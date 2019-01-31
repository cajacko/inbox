import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddButton {
  private addButtonSelector: ISelector = selectors.general.AddButton;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addButtonSelector));
  }

  public async press() {
    return driver.press(getSelector(this.addButtonSelector));
  }
}

export default new AddButton();
