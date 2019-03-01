import { createTransform } from 'redux-persist';
import { IApiReminder } from 'src/lib/graphql/types';
import CustomDate from 'src/lib/modules/CustomDate';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import createReducer from 'src/lib/utils/createReducer';
import { DELETE_REMINDER, SET_REMINDER, TOGGLE_REMINDER_DONE, UPDATE_SNOOZED } from './actions';

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
 * Update the status of an array of reminders
 */
const updateStatus = (
  state: IState,
  reminders: IReminder[],
  saveStatus: IReminder['saveStatus']
): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    const newReminder = { ...reminder, saveStatus };
    newState = { ...newState, [newReminder.id]: newReminder };
  });

  return newState;
};

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
      nextState[reminder.id] = ({
        ...reminder,
        status,
      });
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

export default createReducer<IState>(initialState, {
  [UPDATE_SNOOZED]: (state: IState, { time }) => updateSnoozed(state, time),
  [SET_REMINDER]: (
    state: IState,
    {
      id, text, dateModified, dateCreated, dueDate, saveStatus, status, time,
    }
  ): IState => {
    const reminder: IReminder = {
      dateCreated,
      dateModified,
      dueDate,
      id,
      saveStatus,
      status: getStatus(status, dueDate, time),
      text,
    };

    return Object.assign({}, state, {
      [id]: reminder,
    });
  },
  [DELETE_REMINDER]: (state, { id, dateModified }): IState => {
    const reminder: IReminder = {
      ...state[id],
      dateModified,
      saveStatus: 'saving',
      status: 'DELETED',
    };

    return { ...state, [id]: reminder };
  },
  [SYNC_SUCCESS]: (
    state,
    {
      time,
      newItems: { reminders },
    }: { newItems: { reminders: IApiReminder[] }; time: number }
  ): IState => {
    if (!reminders) return state;

    const newState: IState = Object.assign({}, state);

    reminders.forEach((reminder) => {
      if (!reminder) return;

      const existingReminder = newState[reminder.id];

      if (
        existingReminder &&
        existingReminder.dateModified > reminder.dateModified
      ) {
        return;
      }

      newState[reminder.id] = {
        ...reminder,
        saveStatus: 'saved',
        status: getStatus(reminder.status, reminder.dueDate, time),
      };
    });

    return newState;
  },
  [SYNC_REQUESTED]: (state, { changedReminders }) =>
    updateStatus(state, changedReminders, 'saving'),
  [SYNC_FAILED]: (state, { changedReminders }) =>
    updateStatus(state, changedReminders, 'error'),
  [TOGGLE_REMINDER_DONE]: (state, {
    id, dateModified, isDone, time,
  }) => {
    const existingReminder = state[id];

    const reminder: IReminder = {
      ...existingReminder,
      dateModified,
      saveStatus: 'saving',
      status: isDone
        ? 'DONE'
        : getStatus('INBOX', existingReminder.dueDate, time),
    };

    return { ...state, [id]: reminder };
  },
});
