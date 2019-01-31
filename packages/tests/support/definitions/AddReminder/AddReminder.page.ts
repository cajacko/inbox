import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddReminder {
  private addReminderSelector: ISelector = selectors.general.AddReminder;
  private cancelButtonSelector: ISelector =
    selectors.general.AddReminder.Cancel;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addReminderSelector));
  }

  public async pressCancelButton() {
    return driver.press(getSelector(this.cancelButtonSelector));
  }
}

export default new AddReminder();
