/* eslint max-lines: 0 */
import { IApiReminder } from 'src/lib/graphql/types';
import { PostActions } from 'src/lib/store/actions';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import {
  DELETE_REMINDER,
  REMOVE_REMINDER_REPEAT,
  SET_DUE_DATE,
  SET_REMINDER,
  SET_REMINDER_REPEAT,
  TOGGLE_REMINDER_DONE,
} from './actions';

export type RepeatTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface IRepeat {
  type: RepeatTypes;
  startDate: number;
}

export interface IReminder {
  id: string;
  text: string;
  dateModified: number;
  dateCreated: number;
  dueDate: number;
  saveStatus: 'saving' | 'saved' | 'error';
  status: 'DONE' | 'DELETED' | 'INBOX';
  repeat: null | IRepeat;
}

export interface IState {
  [key: string]: IReminder;
}

export type IJSState = IState;

const initialState: IState = {};

/**
 * Update or set a new reminder
 */
const setReminder = (
  state: IState,
  id: string,
  reminder: Partial<IReminder>
): IState =>
  Object.assign({}, state, {
    [id]: Object.assign({}, state[id] || {}, reminder),
  });

/**
 * Update the status of an array of reminders
 */
const updateStatus = (
  state: IState,
  reminders: Array<IReminder | IApiReminder>,
  saveStatus: IReminder['saveStatus']
): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    newState = setReminder(newState, reminder.id, { saveStatus });
  });

  return newState;
};

/**
 * The reminders reducer
 */
const reducer = (state: IState = initialState, action: PostActions): IState => {
  switch (action.type) {
    case SET_DUE_DATE:
      return setReminder(state, action.payload.id, {
        dateModified: action.time,
        dueDate: action.payload.dueDate,
        saveStatus: 'saving',
        status: 'INBOX',
      });

    case SET_REMINDER:
      return setReminder(state, action.payload.id, {
        dateCreated: action.payload.dateCreated,
        dateModified: action.payload.dateModified,
        dueDate: action.payload.dueDate,
        id: action.payload.id,
        saveStatus: action.payload.saveStatus,
        status: action.payload.status,
        text: action.payload.text,
      });

    case DELETE_REMINDER:
      return setReminder(state, action.payload.id, {
        dateModified: action.payload.dateModified,
        saveStatus: 'saving',
        status: 'DELETED',
      });

    case SYNC_SUCCESS: {
      const { reminders } = action.payload.newItems;

      if (!reminders) return state;

      let newState: IState = Object.assign({}, state);

      reminders.forEach((reminder) => {
        if (!reminder) return;

        const existingReminder = newState[reminder.id];

        if (
          existingReminder &&
          existingReminder.dateModified > reminder.dateModified
        ) {
          return;
        }

        newState = setReminder(newState, reminder.id, {
          ...reminder,
          saveStatus: 'saved',
        });
      });

      return newState;
    }

    case SYNC_REQUESTED:
      return updateStatus(state, action.payload.changedReminders, 'saving');

    case SYNC_FAILED:
      return updateStatus(state, action.payload.changedReminders, 'error');

    case TOGGLE_REMINDER_DONE:
      return setReminder(state, action.payload.id, {
        dateModified: action.payload.dateModified,
        dueDate: action.time,
        saveStatus: 'saving',
        status: action.payload.isDone ? 'DONE' : 'INBOX',
      });

    case SET_REMINDER_REPEAT:
      return setReminder(state, action.payload.id, {
        dateModified: action.time,
        repeat: {
          startDate: action.payload.startDate,
          type: action.payload.type,
        },
        saveStatus: 'saving',
        status: 'INBOX',
      });

    case REMOVE_REMINDER_REPEAT:
      return setReminder(state, action.payload.id, {
        dateModified: action.time,
        repeat: null,
        saveStatus: 'saving',
        status: 'INBOX',
      });

    default:
      return state;
  }
};

export default reducer;
