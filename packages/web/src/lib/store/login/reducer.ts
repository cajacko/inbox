import { LOGOUT } from 'src/lib/store/user/actions';
import createReducer from 'src/lib/utils/createReducer';

export interface IState {
  loginText: string | null;
  reloginId: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  loginText: null,
  reloginId: null,
};

export default createReducer(initialState, {
  [LOGOUT]: (state, { loginText, reloginId }) => ({
    loginText: loginText || null,
    reloginId: reloginId || null,
  }),
});
