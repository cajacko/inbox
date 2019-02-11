import createReducer from 'src/lib/utils/createReducer';
import { SET_REMINDER } from './actions';

export interface IState {
  [key: string]: {
    id: string;
    text: string;
    dateModified: number;
    dateCreated: number;
  };
}

export type IJSState = IState;

const initialState: IState = {};

export default createReducer(initialState, {
  [SET_REMINDER]: (
    state: IState,
    {
      id, text, dateModified, dateCreated,
    }
  ): IState =>
    Object.assign({}, state, {
      [id]: {
        dateCreated,
        dateModified,
        id,
        text,
      },
    }),
});
