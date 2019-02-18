import { IReminder as IApiReminder } from 'src/lib/graphql/sync/client';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import createReducer from 'src/lib/utils/createReducer';
import { DELETE_REMINDER, SET_REMINDER, SET_REMINDER_STATUS } from './actions';

export interface IReminder {
  id: string;
  text: string;
  dateModified: number;
  dateCreated: number;
  status: 'saving' | 'saved' | 'error';
  deleted: boolean;
}

export interface IState {
  [key: string]: IReminder;
}

export type IJSState = IState;

const initialState: IState = {};

/**
 * Update the status of an array of reminders
 */
const updateStatus = (state: IState, reminders: IReminder[], status: IReminder['status']): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    const newReminder = { ...reminder, status };
    newState = { ...newState, [newReminder.id]: newReminder };
  });

  return newState;
};

export default createReducer<IState>(initialState, {
  [SET_REMINDER]: (
    state: IState,
    {
      id, text, dateModified, dateCreated, status,
    }
  ): IState =>
    Object.assign({}, state, {
      [id]: {
        dateCreated,
        dateModified,
        deleted: false,
        id,
        status,
        text,
      },
    }),
  [DELETE_REMINDER]: (state, { id, dateModified }): IState => {
    const reminder = {
      ...state[id],
      dateModified,
      deleted: true,
      status: 'saving',
    };

    return { ...state, [id]: reminder };
  },
  [SYNC_SUCCESS]: (
    state,
    { newItems: { reminders } }: { newItems: { reminders: IApiReminder[] } }
  ): IState => {
    if (!reminders) return state;

    const newState: IState = Object.assign({}, state);

    reminders.forEach((reminder) => {
      if (!reminder) return;

      const existingReminder = newState[reminder.id];

      if (existingReminder && existingReminder.dateModified > reminder.dateModified) {
        return;
      }

      newState[reminder.id] = { ...reminder, status: 'saved' };
    });

    return newState;
  },
  [SET_REMINDER_STATUS]: (state, { id, status }) => updateStatus(state, [state[id]], status),
  [SYNC_REQUESTED]: (state, { changedReminders }) => updateStatus(state, changedReminders, 'saving'),
  [SYNC_FAILED]: (state, { changedReminders }) => updateStatus(state, changedReminders, 'error'),
});
