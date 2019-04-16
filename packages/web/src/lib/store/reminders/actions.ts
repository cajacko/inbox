import CustomDate from 'src/lib/modules/CustomDate';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';
import { IReminder } from './reducer';

export const SET_REMINDER = 'SET_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const TOGGLE_REMINDER_DONE = 'TOGGLE_REMINDER_DONE';
export const UPDATE_SNOOZED = 'UPDATE_SNOOZED';
export const SET_DUE_DATE = 'SET_DUE_DATE';

export const SYNC_ACTIONS = [
  SET_REMINDER,
  DELETE_REMINDER,
  TOGGLE_REMINDER_DONE,
  SET_DUE_DATE,
];

export interface ISetReminderAction {
  type: typeof SET_REMINDER;
  payload: IReminder;
}

/**
 * Set reminder action
 */
export const setReminder = (
  id: string | undefined,
  text: string,
  dueDate: number | undefined
): ISetReminderAction => {
  const now = CustomDate.now();

  let existingReminder;

  if (id) existingReminder = store.getState().reminders[id];

  const status: IReminder['status'] = existingReminder
    ? existingReminder.status
    : 'INBOX';

  // If we've got a new dueDate then set it, otherwise use the existing
  // dueDate, if that doesn't exist then the due date must be now
  const finalDueDate =
    dueDate || (existingReminder ? existingReminder.dueDate : now);

  const data: {
    dateCreated: IReminder['dateCreated'];
    dateModified: IReminder['dateModified'];
    dueDate: IReminder['dueDate'];
    id: IReminder['id'];
    } = testHook('newReminder', {
      dateCreated: id ? undefined : now,
      dateModified: now,
      dueDate: finalDueDate,
      id: id || uuid(),
    });

  return {
    payload: {
      ...data,
      saveStatus: 'saving',
      status,
      text,
    },
    type: SET_REMINDER,
  };
};

export interface IDeleteReminderAction {
  type: typeof DELETE_REMINDER;
  payload: {
    id: string;
    dateModified: number;
  };
}

/**
 * Delete reminder action
 */
export const deleteReminder = (id: string): IDeleteReminderAction => {
  const now = CustomDate.now();

  const dateModified = testHook('newReminder', now);

  return { type: DELETE_REMINDER, payload: { id, dateModified } };
};

export interface IToggleReminderDoneAction {
  type: typeof TOGGLE_REMINDER_DONE;
  payload: {
    id: string;
    dateModified: number;
    isDone: boolean;
  };
}

/**
 * Toggle reminder done action
 */
export const toggleReminderDone = (
  id: string,
  isDone: boolean
): IToggleReminderDoneAction => {
  const now = CustomDate.now();

  const dateModified = testHook('newReminder', now);

  return { type: TOGGLE_REMINDER_DONE, payload: { id, dateModified, isDone } };
};

export interface IUpdateSnoozedAction {
  type: typeof UPDATE_SNOOZED;
  payload: {};
}

/**
 * Update snoozed action
 */
export const updateSnoozed = (): IUpdateSnoozedAction => ({
  payload: {},
  type: UPDATE_SNOOZED,
});

export interface ISetDueDateAction {
  type: typeof SET_DUE_DATE;
  payload: {
    id: string;
    dueDate: number;
  };
}

/**
 * Action for the set due date
 */
export const setDueDate = (id: string, dueDate: number): ISetDueDateAction => ({
  payload: {
    dueDate,
    id,
  },
  type: SET_DUE_DATE,
});
