import { PostActions } from 'src/lib/store/actions';
import { IState } from 'src/lib/store/types';
import { LOGIN, LOGOUT } from './actions';

const initialState: IState['user'] = {
  displayName: null,
  id: null,
  isLoggedIn: false,
  photoURL: null,
  refreshToken: null,
};

/**
 * Add the user object to the state when login and clear on logout
 */
const reducer = (
  state: IState['user'] = initialState,
  action: PostActions
): IState['user'] => {
  switch (action.type) {
    case LOGOUT:
      return initialState;

    case LOGIN:
      return {
        ...initialState,
        ...action.payload.user,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default reducer;
