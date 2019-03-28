/* eslint max-lines: 0 */
import { createTransform } from 'redux-persist';
import { IApiReminder } from 'src/lib/graphql/types';
import CustomDate from 'src/lib/modules/CustomDate';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import createReducer from 'src/lib/utils/createReducer';
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
  time: number,
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
  reminders: IReminder[],
  saveStatus: IReminder['saveStatus'],
  time: number,
): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    newState = setReminder(newState, reminder.id, { saveStatus }, time);
  });

  return newState;
};

export default createReducer<IState>(initialState, {
  [SET_DUE_DATE]: (state: IState, payload) => setReminder(state, payload.id, {
    dateModified: payload.time,
    dueDate: payload.dueDate,
    saveStatus: 'saving',
    status: 'INBOX',
  }, payload.time),
  [UPDATE_SNOOZED]: (state: IState, { time }) => updateSnoozed(state, time),
  [SET_REMINDER]: (
    state: IState,
    {
      id, text, dateModified, dateCreated, dueDate, saveStatus, status, time,
    }
  ): IState => setReminder(state, id, {
    dateCreated,
    dateModified,
    dueDate,
    id,
    saveStatus,
    status,
    text,
  }, time),
  [DELETE_REMINDER]: (state, payload): IState => setReminder(state, payload.id, {
    dateModified: payload.dateModified,
    saveStatus: 'saving',
    status: 'DELETED',
  }, payload.time),
  [SYNC_SUCCESS]: (
    state,
    {
      time,
      newItems: { reminders },
    }: { newItems: { reminders: IApiReminder[] }; time: number }
  ): IState => {
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

      newState = setReminder(newState, reminder.id, { ...reminder, saveStatus: 'saved' }, time);
    });

    return newState;
  },
  [SYNC_REQUESTED]: (state, { changedReminders, time }) =>
    updateStatus(state, changedReminders, 'saving', time),
  [SYNC_FAILED]: (state, { changedReminders, time }) =>
    updateStatus(state, changedReminders, 'error', time),
  [TOGGLE_REMINDER_DONE]: (state, {
    id, dateModified, isDone, time,
  }) => setReminder(state, id, {
    dateModified,
    dueDate: time,
    saveStatus: 'saving',
    status: isDone ? 'DONE' : 'INBOX',
  }, time),
});
