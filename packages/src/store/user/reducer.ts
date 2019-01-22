import createReducer from 'src/lib/utils/createReducer';
import { LOGOUT, SET_IS_LOGGED_IN } from './actions';

export interface IState {
  isLoggedIn: boolean;
  id: string | null;
  displayName: string | null;
  photoURL: string | null;
}

const initialState: IState = {
  displayName: null,
  id: null,
  isLoggedIn: false,
  photoURL: null,
};

export default createReducer(initialState, {
  [LOGOUT]: () => initialState,
  [SET_IS_LOGGED_IN]: (state: IState, { isLoggedIn, user }): IState =>
    Object.assign({}, state, { isLoggedIn, ...(user || {}) }),
});
