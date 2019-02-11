import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddReminder {
  private addReminderSelector: ISelector = selectors.general.AddReminder;
  private cancelButtonSelector: ISelector =
    selectors.general.AddReminder.Cancel;
  private inputSelector: ISelector = selectors.general.AddReminder.Input;
  private saveButtonSelector: ISelector = selectors.general.AddReminder.Save;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addReminderSelector));
  }

  public async pressCancelButton() {
    return driver.press(getSelector(this.cancelButtonSelector));
  }

  public async inputFocused(condition: ICondition) {
    return driver.focused(condition, getSelector(this.inputSelector));
  }

  public async type(text: string) {
    return driver.type(getSelector(this.inputSelector), text);
  }

  public async textIs(condition: ICondition, text: string) {
    return driver.value(condition, getSelector(this.inputSelector), text);
  }

  public async saveDisabled(condition: ICondition) {
    return driver.disabled(condition, getSelector(this.saveButtonSelector));
  }

  public async pressSave() {
    return driver.press(getSelector(this.saveButtonSelector));
  }

  public async clear() {
    return driver.clear(getSelector(this.inputSelector));
  }
}

export default new AddReminder();
