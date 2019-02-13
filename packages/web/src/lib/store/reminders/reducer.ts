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
  [SET_REMINDER_STATUS]: (state, { id, status }) => {
    const reminder = { ...state[id], status };

    return { ...state, [id]: reminder };
  },
  [DELETE_REMINDER]: (state, { id, dateModified }): IState => {
    const reminder = {
      ...state[id],
      dateModified,
      deleted: true,
      status: 'saving',
    };

    return { ...state, [id]: reminder };
  },
});
