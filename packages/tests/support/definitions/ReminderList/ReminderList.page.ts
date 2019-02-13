import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class ReminderList {
  private reminderListSelector: ISelector =
    selectors.general.ReminderList.Reminders;
  private reminderTextSelector: ISelector =
    selectors.general.ReminderList.Reminder.Text;

  public async count(conditional: ICondition, value: number) {
    return driver.count(
      conditional,
      getSelector(this.reminderListSelector),
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
}

export default new ReminderList();
