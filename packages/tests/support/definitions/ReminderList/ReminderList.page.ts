import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Api {
  private reminderListSelector: ISelector =
    selectors.general.ReminderList.Reminders;

  public async count(conditional: ICondition, value: number) {
    return driver.count(
      conditional,
      getSelector(this.reminderListSelector),
      value
    );
  }

  public async text(conditional: ICondition, index: number, value: string) {
    throw new Error('No implemented yet');
  }
}

export default new Api();
