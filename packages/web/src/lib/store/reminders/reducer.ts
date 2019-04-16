/* eslint max-lines: 0 */
import { createTransform } from 'redux-persist';
import { IApiReminder } from 'src/lib/graphql/types';
import CustomDate from 'src/lib/modules/CustomDate';
import { PostActions } from 'src/lib/store/actions';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import {
  DELETE_REMINDER,
  SET_DUE_DATE,
  SET_REMINDER,
  TOGGLE_REMINDER_DONE,
  UPDATE_SNOOZED,
} from './actions';

export interface IReminder {
  id: string;
  text: string;
  dateModified: number;
  dateCreated: number;
  dueDate: number;
  saveStatus: 'saving' | 'saved' | 'error';
  status: 'DONE' | 'DELETED' | 'INBOX' | 'SNOOZED';
}

export interface IState {
  [key: string]: IReminder;
}

export type IJSState = IState;

const initialState: IState = {};

/**
 * Figure out if the reminder status should be snoozed or not
 */
const getStatus = (
  givenStatus: IReminder['status'],
  dueDate: number,
  time: number
): IReminder['status'] => {
  switch (givenStatus) {
    case 'INBOX':
    case 'SNOOZED': {
      if (dueDate > time) return 'SNOOZED';

      return 'INBOX';
    }

    default:
      return givenStatus;
  }
};

/**
 * Update all snoozed reminders
 */
const updateSnoozed = (state: IState, time: number): IState => {
  const nextState = {};

  Object.values(state).forEach((reminder) => {
    const status = getStatus(reminder.status, reminder.dueDate, time);

    if (status !== reminder.status) {
      nextState[reminder.id] = {
        ...reminder,
        status,
      };
    } else {
      nextState[reminder.id] = reminder;
    }
  });

  return nextState;
};

export const transform = createTransform(
  // transform state on its way to being serialized and persisted.
  inboundState => inboundState,
  // transform state being rehydrated
  (outboundState: IState): IState =>
    updateSnoozed(outboundState, CustomDate.now()),
  // define which reducers this transform gets called for.
  { whitelist: ['reminders'] }
);

/**
 * Update or set a new reminder
 */
const setReminder = (
  state: IState,
  id: string,
  reminder: Partial<IReminder>,
  time: number
): IState => {
  const newReminder = Object.assign({}, state[id] || {}, reminder);

  newReminder.status = getStatus(newReminder.status, newReminder.dueDate, time);

  return Object.assign({}, state, {
    [id]: newReminder,
  });
};

/**
 * Update the status of an array of reminders
 */
const updateStatus = (
  state: IState,
  reminders: Array<IReminder | IApiReminder>,
  saveStatus: IReminder['saveStatus'],
  time: number
): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    newState = setReminder(newState, reminder.id, { saveStatus }, time);
  });

  return newState;
};

/**
 * The reminders reducer
 */
const reducer = (state: IState = initialState, action: PostActions): IState => {
  switch (action.type) {
    case SET_DUE_DATE:
      return setReminder(
        state,
        action.payload.id,
        {
          dateModified: action.time,
          dueDate: action.payload.dueDate,
          saveStatus: 'saving',
          status: 'INBOX',
        },
        action.time
      );

    case UPDATE_SNOOZED:
      return updateSnoozed(state, action.time);

    case SET_REMINDER:
      return setReminder(
        state,
        action.payload.id,
        {
          dateCreated: action.payload.dateCreated,
          dateModified: action.payload.dateModified,
          dueDate: action.payload.dueDate,
          id: action.payload.id,
          saveStatus: action.payload.saveStatus,
          status: action.payload.status,
          text: action.payload.text,
        },
        action.time
      );

    case DELETE_REMINDER:
      return setReminder(
        state,
        action.payload.id,
        {
          dateModified: action.payload.dateModified,
          saveStatus: 'saving',
          status: 'DELETED',
        },
        action.time
      );

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

        newState = setReminder(
          newState,
          reminder.id,
          { ...reminder, saveStatus: 'saved' },
          action.time
        );
      });

      return newState;
    }

    case SYNC_REQUESTED:
      return updateStatus(
        state,
        action.payload.changedReminders,
        'saving',
        action.time
      );

    case SYNC_FAILED:
      return updateStatus(
        state,
        action.payload.changedReminders,
        'error',
        action.time
      );

    case TOGGLE_REMINDER_DONE:
      return setReminder(
        state,
        action.payload.id,
        {
          dateModified: action.payload.dateModified,
          dueDate: action.time,
          saveStatus: 'saving',
          status: action.payload.isDone ? 'DONE' : 'INBOX',
        },
        action.time
      );

    default:
      return state;
  }
};

export default reducer;
