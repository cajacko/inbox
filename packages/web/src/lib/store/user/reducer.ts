import createReducer from 'src/lib/utils/createReducer';
import { LOGIN, LOGOUT } from './actions';

export interface IState {
  isLoggedIn: boolean;
  id: string | null;
  displayName: string | null;
  refreshToken?: string | null;
  photoURL: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  displayName: null,
  id: null,
  isLoggedIn: false,
  photoURL: null,
  refreshToken: null,
};

export default createReducer(initialState, {
  [LOGOUT]: () => initialState,
  [LOGIN]: (state: IState, { user }): IState =>
    Object.assign({}, state, { isLoggedIn: true, ...(user || {}) }),
});
