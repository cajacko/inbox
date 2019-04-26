export type SyncType = 'cron' | 'action' | 'init' | 'queued' | 'manual';

export type RepeatSimpleTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type RepeatTypes = RepeatSimpleTypes | 'CUSTOM_DAILY' | 'CUSTOM_MONTHLY';

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

export type Repeated = RepeatedSimple | RepeatedCustom;

export interface IReminderNoStatus {
  dateCreated: number;
  dateModified: number;
  deletedDate: number | null;
  doneDate: number | null;
  id: string;
  inboxDate: number | null;
  repeated: null | Repeated;
  snoozedDate: number | null;
  text: string;
}

export interface IReminder extends IReminderNoStatus {
  saveStatus: 'saving' | 'saved' | 'error';
}

export interface IPersistedState {
  reminders: {
    remindersById: {
      // Not completely accurate having undefined, but this is the only way for
      // TS to ensure we check a reminder exists when we try and get it by ID,
      // as it may not exist
      [key: string]: IReminder | undefined;
    };
    remindersByList: {
      deleted: string[];
      done: string[];
      inbox: string[];
      repeated: string[];
      snoozed: string[];
    };
  };
  user: {
    isLoggedIn: boolean;
    id: string | null;
    displayName: string | null;
    refreshToken?: string | null;
    photoURL: string | null;
  };
}

// IMPORTANT - any added/removed keys must be reflected in the BLACKLIST const
// in this file. If you can enforce this through types somehow, then do it
interface IBlacklistState {
  login: {
    loginText: string | null;
    reloginId: string | null;
  };
  sync: {
    type: 'INIT' | 'REQUESTED' | 'FAILED' | 'SUCCESS';
    error: string | null;
    syncType: SyncType | null;
  };
}

// IMPORTANT - any added/removed keys must be reflected in the IBlacklistState
// interface in this file. If you can enforce this through types somehow, then
// do it
export const BLACKLIST: Array<keyof IBlacklistState> = ['login', 'sync'];

export interface IState extends IPersistedState, IBlacklistState {}
