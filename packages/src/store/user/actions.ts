import makeActionCreator from 'src/lib/utils/makeActionCreator';

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const LOGOUT = 'LOGOUT';

export const setIsLoggedIn = makeActionCreator(
  SET_IS_LOGGED_IN,
  'isLoggedIn',
  'user'
);

export const logout = makeActionCreator(LOGOUT);
