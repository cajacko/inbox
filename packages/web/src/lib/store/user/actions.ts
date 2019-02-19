import makeActionCreator from 'src/lib/utils/makeActionCreator';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ID_TOKEN = 'SET_ID_TOKEN';

export const SYNC_ACTIONS = [LOGIN];

export const login = makeActionCreator(LOGIN, 'user');

export const logout = makeActionCreator(LOGOUT, 'loginText', 'reloginId');

export const setIdToken = makeActionCreator(SET_ID_TOKEN, 'idToken');
