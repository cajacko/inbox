import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class ReminderList {
  private remindersSelector: ISelector =
    selectors.general.ReminderList.Reminders;
  private reminderTextSelector: ISelector =
    selectors.general.ReminderList.Reminder.Text;
  private reminderButtonSelector: ISelector =
    selectors.general.ReminderList.Reminder.Button;
  private reminderDeleteButtonSelector: ISelector =
    selectors.general.ReminderList.Reminder.DeleteButton;
  private reminderEditButtonSelector: ISelector =
    selectors.general.ReminderList.Reminder.EditButton;
  private errorSelector: ISelector = selectors.general.ReminderList.Error;
  private loadingSelector: ISelector = selectors.general.ReminderList.Loading;
  private reminderListSelector: ISelector = selectors.general.ReminderList;
  private reminderListScrollSelector: ISelector =
    selectors.general.ReminderList.Scroll;

  public async count(conditional: ICondition, value: number) {
    return driver.count(
      conditional,
      getSelector(this.remindersSelector),
      value
    );
  }

  public async text(conditional: ICondition, index: number, value: string) {
    return driver.text(
      conditional,
      getSelector(this.reminderTextSelector, { index }),
      value
    );
  }

  public async status(conditional: ICondition, index: number, status: string) {
    const selector = selectors.general.ReminderList.Reminder.Status[status];

    return driver.visible(conditional, getSelector(selector, { index }));
  }

  public async hover(index: number) {
    return driver.hover(getSelector(this.reminderButtonSelector, { index }));
  }

  public async press(index: number) {
    return driver.press(getSelector(this.reminderButtonSelector, { index }));
  }

  private getButtonSelector(index: number, component: string) {
    let selector;

    switch (component) {
      case 'delete':
        selector = getSelector(this.reminderDeleteButtonSelector, { index });
        break;
      case 'edit':
        selector = getSelector(this.reminderEditButtonSelector, { index });
        break;
      default:
        throw new Error('Unknown component given');
    }

    return selector;
  }

  public async buttonVisible(
    conditional: ICondition,
    index: number,
    component: string
  ) {
    return driver.visible(
      conditional,
      this.getButtonSelector(index, component)
    );
  }

  public async pressButton(index: number, component: string) {
    return driver.press(this.getButtonSelector(index, component));
  }

  public async errorVisible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.errorSelector));
  }

  public async loadingVisible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.loadingSelector));
  }

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.reminderListSelector));
  }

  public async scrollToBottom() {
    return driver.scrollToBottom(getSelector(this.reminderListScrollSelector));
  }
}

export default new ReminderList();
