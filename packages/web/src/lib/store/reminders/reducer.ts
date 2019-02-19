import { IApiReminder } from 'src/lib/graphql/types';
import {
  SYNC_FAILED,
  SYNC_REQUESTED,
  SYNC_SUCCESS,
} from 'src/lib/store/sync/actions';
import createReducer from 'src/lib/utils/createReducer';
import { DELETE_REMINDER, MARK_REMINDER_AS_DONE, SET_REMINDER, SET_REMINDER_SAVE_STATUS } from './actions';

export interface IReminder {
  id: string;
  text: string;
  dateModified: number;
  dateCreated: number;
  saveStatus: 'saving' | 'saved' | 'error';
  status: 'DONE' | 'DELETED' | 'INBOX'
}

export interface IState {
  [key: string]: IReminder;
}

export type IJSState = IState;

const initialState: IState = {};

/**
 * Update the status of an array of reminders
 */
const updateStatus = (state: IState, reminders: IReminder[], saveStatus: IReminder['saveStatus']): IState => {
  let newState = state;

  reminders.forEach((reminder) => {
    const newReminder = { ...reminder, saveStatus };
    newState = { ...newState, [newReminder.id]: newReminder };
  });

  return newState;
};

export default createReducer<IState>(initialState, {
  [SET_REMINDER]: (
    state: IState,
    {
      id, text, dateModified, dateCreated, saveStatus, status,
    }
  ): IState => {
    const reminder: IReminder = {
      dateCreated,
      dateModified,
      id,
      saveStatus,
      status,
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

      newState[reminder.id] = { ...reminder, saveStatus: 'saved' };
    });

    return newState;
  },
  [SET_REMINDER_SAVE_STATUS]: (state, { id, saveStatus }) => updateStatus(state, [state[id]], saveStatus),
  [SYNC_REQUESTED]: (state, { changedReminders }) => updateStatus(state, changedReminders, 'saving'),
  [SYNC_FAILED]: (state, { changedReminders }) => updateStatus(state, changedReminders, 'error'),
  [MARK_REMINDER_AS_DONE]: (state, { id, dateModified }) => {
    const reminder: IReminder = {
      ...state[id],
      dateModified,
      saveStatus: 'saving',
      status: 'DONE',
    };

    return { ...state, [id]: reminder };
  },
});
