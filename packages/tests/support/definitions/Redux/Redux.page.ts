import { set } from '../../config/hookConstants';
import buildReminderObj from '../../utils/buildReminderObj';
import driver from '../../utils/driver';

class Redux {
  public async preloadReminders(count: number, nonHeadless: boolean) {
    set('initialState', {
      reminders: buildReminderObj(count, true),
    });

    await driver.addHook('initialState', 'initialState', nonHeadless);
  }
}

export default new Redux();
