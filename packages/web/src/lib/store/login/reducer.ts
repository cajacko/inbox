import { PostActions } from 'src/lib/store/actions';
import { IState } from 'src/lib/store/types';
import { LOGOUT } from 'src/lib/store/user/actions';

const initialState: IState['login'] = {
  loginText: null,
  reloginId: null,
};

/**
 * Handle any additional login state needed. Mainly if we're forcing someone to
 * re login again
 */
const reducer = (
  state: IState['login'] = initialState,
  action: PostActions
): IState['login'] => {
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
