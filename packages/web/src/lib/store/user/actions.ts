import { IUser } from 'src/lib/types/general';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const SYNC_ACTIONS = [LOGIN];

export interface ILoginPayload {
  type: typeof LOGIN;
  payload: {
    user: IUser;
  };
}

export interface ILogoutPayload {
  type: typeof LOGOUT;
  payload: {
    loginText: string | undefined | null;
    reloginId: string | undefined | null;
  };
}

/**
 * The login action
 */
export const login = (user: IUser): ILoginPayload => ({
  payload: { user },
  type: LOGIN,
});

/**
 * The logout action
 */
export const logout = (
  loginText?: string | null,
  reloginId?: string | null
): ILogoutPayload => ({
  payload: { loginText, reloginId },
  type: LOGOUT,
});
