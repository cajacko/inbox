import createReducer from 'src/lib/utils/createReducer';
import { LOGIN, LOGOUT, SET_ID_TOKEN } from './actions';

export interface IState {
  isLoggedIn: boolean;
  id: string | null;
  idToken: string | null;
  displayName: string | null;
  refreshToken?: string | null;
  photoURL: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  displayName: null,
  id: null,
  idToken: null,
  isLoggedIn: false,
  photoURL: null,
  refreshToken: null,
};

export default createReducer(initialState, {
  [SET_ID_TOKEN]: (state, { idToken }) => ({ ...state, idToken }),
  [LOGOUT]: () => initialState,
  [LOGIN]: (state: IState, { user }): IState =>
    Object.assign({}, state, { isLoggedIn: true, ...(user || {}) }),
});
