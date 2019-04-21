import {
  IPersistedState as V0State,
  IReminder as V0IReminder,
} from '../../types/v0';
import { IPersistedState as V1State } from '../../types/v1';
import v1 from '../v1';

describe('v1 migration', () => {
  const dateCreated = new Date('2019-04-21T10:29:40.670Z').getTime();
  const dateModified = new Date('2019-04-22T10:29:40.670Z').getTime();
  const dueDate = new Date('2019-04-23T10:29:40.670Z').getTime();
  const text = 'Reminder text';

  const createV0Reminder = (
    id: V0IReminder['id'],
    saveStatus: V0IReminder['saveStatus'],
    status: V0IReminder['status']
  ) => ({
    [id]: {
      dateCreated,
      dateModified,
      dueDate,
      id,
      saveStatus,
      status,
      text,
    },
  });

  it('Successfully transforms a full v0 state to a full v1 state', () => {
    const v0State: V0State = {
      reminders: {
        ...createV0Reminder('reminder-id-1', 'error', 'DELETED'),
        ...createV0Reminder('reminder-id-2', 'saved', 'DONE'),
        ...createV0Reminder('reminder-id-3', 'saving', 'INBOX'),
        ...createV0Reminder('reminder-id-4', 'saved', 'SNOOZED'),
      },
      user: {
        displayName: 'Charlie Jackson',
        id: 'user-id',
        isLoggedIn: true,
        photoURL: 'https://photoUrl',
      },
    };

    const v1State: V1State = {
      reminders: {
        remindersById: {
          'reminder-id-1': {
            dateCreated,
            dateModified,
            deletedDate: dueDate,
            doneDate: null,
            id: 'reminder-id-1',
            inboxDate: null,
            repeated: null,
            saveStatus: 'error',
            snoozedDate: null,
            text: 'Reminder text',
          },
          'reminder-id-2': {
            dateCreated,
            dateModified,
            deletedDate: null,
            doneDate: dueDate,
            id: 'reminder-id-2',
            inboxDate: null,
            repeated: null,
            saveStatus: 'saved',
            snoozedDate: null,
            text: 'Reminder text',
          },
          'reminder-id-3': {
            dateCreated,
            dateModified,
            deletedDate: null,
            doneDate: null,
            id: 'reminder-id-3',
            inboxDate: dueDate,
            repeated: null,
            saveStatus: 'saving',
            snoozedDate: null,
            text: 'Reminder text',
          },
          'reminder-id-4': {
            dateCreated,
            dateModified,
            deletedDate: null,
            doneDate: null,
            id: 'reminder-id-4',
            inboxDate: null,
            repeated: null,
            saveStatus: 'saved',
            snoozedDate: dueDate,
            text: 'Reminder text',
          },
        },
        remindersByList: {
          deleted: [],
          done: [],
          inbox: [],
          repeated: [],
          snoozed: [],
        },
      },
      user: {
        displayName: 'Charlie Jackson',
        id: 'user-id',
        isLoggedIn: true,
        photoURL: 'https://photoUrl',
      },
    };

    expect(v1(v0State)).toEqual(v1State);
  });
});
