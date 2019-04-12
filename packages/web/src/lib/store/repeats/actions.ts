import makeActionCreator from 'src/lib/utils/makeActionCreator';

export const SET_REMINDER_REPEAT = 'SET_REMINDER_REPEAT';

export const SYNC_ACTIONS = [SET_REMINDER_REPEAT];

export const setReminderRepeat = makeActionCreator(
  SET_REMINDER_REPEAT,
  'payload',
  'startDate'
);
