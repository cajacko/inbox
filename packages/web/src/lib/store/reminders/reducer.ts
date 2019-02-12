import createReducer from 'src/lib/utils/createReducer';
import { SET_REMINDER, SET_REMINDER_STATUS } from './actions';

export interface IState {
  [key: string]: {
    id: string;
    text: string;
    dateModified: number;
    dateCreated: number;
    status: 'saving' | 'saved' | 'error';
  };
}

export type IJSState = IState;

const initialState: IState = {};

export default createReducer(initialState, {
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
        id,
        status,
        text,
      },
    }),
  [SET_REMINDER_STATUS]: (state, { id, status }) => {
    const reminder = { ...state[id], status };

    return { ...state, [id]: reminder };
  },
});
