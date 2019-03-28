import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddReminder {
  private addReminderSelector: ISelector = selectors.general.AddReminder;
  private editReminderSelector: ISelector = selectors.general.EditReminder;
  private cancelButtonSelector: ISelector =
    selectors.general.AddReminder.Cancel;
  private inputSelector: ISelector = selectors.general.AddReminder.Input;
  private saveButtonSelector: ISelector = selectors.general.AddReminder.Save;
  private deleteButtonSelector: ISelector =
    selectors.general.AddReminder.Delete;
  private doneButtonSelector: ISelector = selectors.general.AddReminder.Done;
  private snoozeButtonSelector: ISelector =
    selectors.general.AddReminder.Snooze;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addReminderSelector));
  }

  public async editVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.editReminderSelector));
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

  private getComponentSelector(component: string) {
    switch (component) {
      case 'done button':
        return getSelector(this.doneButtonSelector);
      case 'delete button':
        return getSelector(this.deleteButtonSelector);
      case 'snooze button':
        return getSelector(this.snoozeButtonSelector);
      default:
        throw new Error('No matching component');
    }
  }

  public async componentVisible(condition: ICondition, component: string) {
    return driver.visible(condition, this.getComponentSelector(component));
  }

  public async pressComponent(component: string) {
    return driver.press(this.getComponentSelector(component));
  }
}

export default new AddReminder();
