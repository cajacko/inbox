import { PostActions } from 'src/lib/store/actions';
import { LOGOUT } from 'src/lib/store/user/actions';

export interface IState {
  loginText: string | null;
  reloginId: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  loginText: null,
  reloginId: null,
};

/**
 * Handle any additional login state needed. Mainly if we're forcing someone to
 * re login again
 */
const reducer = (state: IState = initialState, action: PostActions): IState => {
  switch (action.type) {
    case LOGOUT:
      return {
        loginText: action.payload.loginText || null,
        reloginId: action.payload.reloginId || null,
      };

    default:
      return state;
  }
};

export default reducer;
