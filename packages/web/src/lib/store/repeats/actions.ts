import { RepeatTypes } from './reducer';

export const SET_REMINDER_REPEAT = 'SET_REMINDER_REPEAT';

export const SYNC_ACTIONS = [SET_REMINDER_REPEAT];

export interface ISetReminderRepeatAction {
  type: typeof SET_REMINDER_REPEAT;
  payload: {
    type: RepeatTypes;
    startDate: number;
    reminderId: string;
  };
}

/**
 * Action for setting the reminder repeats
 */
export const setReminderRepeat = (
  type: RepeatTypes,
  startDate: number,
  reminderId: string
): ISetReminderRepeatAction => ({
  payload: {
    reminderId,
    startDate,
    type,
  },
  type: SET_REMINDER_REPEAT,
});

// export const setReminderRepeat = makeActionCreator(
//   SET_REMINDER_REPEAT,
//   (type, startDate, reminderId) => ({
//     type,
//     startDate,
//     reminderId,
//   })
// );

// export const removeReminderRepeat = makeActionCreator();
