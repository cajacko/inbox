import { IPersistedState as IStateIn } from 'src/lib/store/types/v0';
import {
  IPersistedState as IStateOut,
  IReminder,
} from 'src/lib/store/types/v1';

/**
 * Migrate redux persist from v0 to v1
 */
const migrate = (state: IStateIn): IStateOut => {
  const newState: IStateOut = {
    reminders: {
      remindersById: {},
      remindersByList: {
        deleted: [],
        done: [],
        inbox: [],
        repeated: [],
        snoozed: [],
      },
    },
    user: state.user,
  };

  Object.values(state.reminders).forEach((reminder) => {
    if (!reminder) return;

    const newReminder = {
      dateCreated: reminder.dateCreated,
      dateModified: reminder.dateModified,
      id: reminder.id,
      repeated: null,
      saveStatus: reminder.saveStatus,
      text: reminder.text,
    };

    /**
     * Based off the reminder status get the new dates
     */
    const getDates = (): {
      deletedDate: IReminder['deletedDate'];
      doneDate: IReminder['doneDate'];
      inboxDate: IReminder['inboxDate'];
      snoozedDate: IReminder['snoozedDate'];
      } => {
      switch (reminder.status) {
        case 'DELETED':
          return {
            deletedDate: reminder.dueDate,
            doneDate: null,
            inboxDate: null,
            snoozedDate: null,
          };
        case 'DONE':
          return {
            deletedDate: null,
            doneDate: reminder.dueDate,
            inboxDate: null,
            snoozedDate: null,
          };
        case 'SNOOZED':
          return {
            deletedDate: null,
            doneDate: null,
            inboxDate: null,
            snoozedDate: reminder.dueDate,
          };
        default:
          return {
            deletedDate: null,
            doneDate: null,
            inboxDate: reminder.dueDate,
            snoozedDate: null,
          };
      }
    };

    newState.reminders.remindersById[reminder.id] = {
      ...newReminder,
      ...getDates(),
    };
  });

  return newState;
};

export default migrate;
