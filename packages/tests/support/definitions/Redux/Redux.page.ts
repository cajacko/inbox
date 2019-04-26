import { IPersistedState } from '../../../lib/store/types/index';
import { set } from '../../config/hookConstants';
import * as buildReminderObj from '../../utils/buildReminderObj';
import driver from '../../utils/driver';

class Redux {
  public async preloadReminders(
    count: number,
    nonHeadless: boolean,
    status?: string
  ) {
    const initialState: Partial<IPersistedState> = {
      reminders: {
        remindersById: buildReminderObj.redux(count, status),
        remindersByList: {
          deleted: [],
          done: [],
          inbox: [],
          repeated: [],
          snoozed: [],
        },
      },
    };

    set('initialState', initialState);

    await driver.addHook('initialState', 'initialState', nonHeadless);
  }
}

export default new Redux();
