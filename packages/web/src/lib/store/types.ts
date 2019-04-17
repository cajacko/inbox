type RepeatSimpleTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

type RepeatTypes = RepeatSimpleTypes | 'CUSTOM_DAILY' | 'CUSTOM_MONTHLY';

interface IRepeat<T extends RepeatTypes> {
  startDate: number;
  type: T;
}

type RepeatedSimple = IRepeat<RepeatSimpleTypes>;

interface IRepeatCustomWeekly extends IRepeat<'CUSTOM_DAILY'> {
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  everyXWeeks: number;
}

interface IRepeatCustomMonthly extends IRepeat<'CUSTOM_MONTHLY'> {
  everyXMonths: number;
}

type RepeatedCustom = IRepeatCustomWeekly | IRepeatCustomMonthly;

interface IState {
  login: {
    loginText: string | null;
    reloginUserId: string | null;
  };
  reminders: {
    remindersById: {
      [key: string]: {
        dateCreated: number;
        dateModified: number;
        deletedDate: number;
        doneDate: number | null;
        id: string;
        inboxDate: number | null;
        repeated: null | RepeatedSimple | RepeatedCustom;
        saveStatus: 'saving' | 'saved' | 'error';
        snoozedDate: number | null;
        text: string;
      };
    };
    remindersByList: {
      deleted: string[];
      done: string[];
      inbox: string[];
      repeated: string[];
      snoozed: string[];
    };
  };
  syncStatus: {
    error: string | null;
    syncType: 'cron' | 'action' | 'init' | 'queued' | 'manual' | null;
    type: 'INIT' | 'REQUESTED' | 'FAILED' | 'SUCCESS';
  };
  user: {
    displayName: string | null;
    id: string | null;
    isLoggedIn: boolean;
    photoURL: string | null;
  };
}

// Actions
// setReminder
// setReminders
// updateReminderTimings
//
// Reducer is responsible for making sure everything is in the correct list and
// has the correct null or number values for certain dates

// Order of reminders to get from server
// All repeated reminders
// All snoozed reminders
// Last x reminders in current list ordered by inboxDate/doneDate/deletedDate
// depending on current list

// Never delete reminders whose last sync status is not saved, unless logout
// Delete all reminders on proper logout

// Move snooze to inbox
// Copy repeated to inbox
