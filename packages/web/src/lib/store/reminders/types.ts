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

export interface IReminder {
  dateCreated: number;
  dateModified: number;
  deletedDate: number | null;
  doneDate: number | null;
  id: string;
  inboxDate: number | null;
  repeated: null | Repeated;
  saveStatus: 'saving' | 'saved' | 'error';
  snoozedDate: number | null;
  text: string;
}

export interface IState {
  remindersById: {
    // Not completely accurate having undefined, but this is the only way for TS
    // to ensure we check a reminder exists when we try and get it by ID, as it
    // may not exist
    [key: string]: IReminder | undefined;
  };
  remindersByList: {
    deleted: string[];
    done: string[];
    inbox: string[];
    repeated: string[];
    snoozed: string[];
  };
}

export type IJSState = IState;
