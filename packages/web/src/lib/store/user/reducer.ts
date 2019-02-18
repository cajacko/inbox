import createReducer from 'src/lib/utils/createReducer';
import { LOGIN, LOGOUT } from './actions';

export interface IState {
  isLoggedIn: boolean;
  id: string | null;
  idToken: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  displayName: null,
  id: null,
  idToken: null,
  isLoggedIn: false,
  photoURL: null,
};

export default createReducer(initialState, {
  [LOGOUT]: () => initialState,
  [LOGIN]: (state: IState, { user }): IState =>
    Object.assign({}, state, { isLoggedIn: true, ...(user || {}) }),
});
