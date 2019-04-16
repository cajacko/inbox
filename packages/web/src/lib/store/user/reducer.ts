import { PostActions } from 'src/lib/store/actions';
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

/**
 * Add the user object to the state when login and clear on logout
 */
const reducer = (state: IState = initialState, action: PostActions): IState => {
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
