import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddReminder {
  private addReminderSelector: ISelector = selectors.general.AddReminder;
  private cancelButtonSelector: ISelector =
    selectors.general.AddReminder.Cancel;
  private inputSelector: ISelector = selectors.general.AddReminder.Input;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addReminderSelector));
  }

  public async pressCancelButton() {
    return driver.press(getSelector(this.cancelButtonSelector));
  }

  public async inputFocused(condition: ICondition) {
    return driver.focused(condition, getSelector(this.inputSelector));
  }
}

export default new AddReminder();
