import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class AddReminder {
  private addReminderSelector: ISelector = selectors.general.AddReminder;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.addReminderSelector));
  }
}

export default new AddReminder();
