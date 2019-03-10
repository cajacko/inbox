import mockUser from 'src/lib/config/mockUser';
import Alert from 'src/lib/modules/Alert';
import AppError from 'src/lib/modules/AppError';
import {
  login as loginAction,
  logout as logoutAction,
} from 'src/lib/store/user/actions';
import { IUser } from 'src/lib/types/general';
import analytics from 'src/lib/utils/analytics';
import history from 'src/lib/utils/history';
import marketingCopy from 'src/lib/utils/marketingCopy';
import store from 'src/lib/utils/store';
import { startSyncCron } from 'src/lib/utils/sync';
import * as updateSnoozedCron from 'src/lib/utils/updateSnoozedCron';
import AuthImplementation from 'src/modules/Auth';
import getEnvVar from 'src/utils/getEnvVar';
import testHook from 'src/utils/testHook';

let loginId = 0;

/**
 * Handle login and logout
 */
class Auth {
  /**
   * Get the current user
   */
  public static getUser(): Promise<IUser | null> {
    return testHook('getUser', Promise.resolve())
      .then(() => {
        if (getEnvVar('BY_PASS_AUTH')) return Promise.resolve(mockUser);

        return AuthImplementation.getUser();
      })
      .then((user: IUser) => {
        analytics.setUserIfNotSet({ userId: user.id });

        return user;
      })
      .catch(() => null);
  }

  /**
   * Set the user in the store, analytics and redirect
   */
  public static setUser(user: IUser, shouldRedirect: boolean = true, redirectPath: string = '/') {
    analytics.setUserIfNotSet({ userId: user.id });

    store.dispatch(loginAction(user));

    if (shouldRedirect) history.push(redirectPath);

    return Promise.resolve(user);
  }

  /**
   * Log the user in
   */
  public static login(redirectPath?: string): Promise<IUser | null> {
    loginId += 1;
    const loginSessionId = loginId;

    const { delay } = testHook('login', {
      delay: () => Promise.resolve(),
    });

    return delay()
      .then(() => Auth.getUser())
      .catch(() => null)
      .then((user: IUser | null) => {
        if (loginSessionId !== loginId) return null;
        if (user) return user;

        return AuthImplementation.login().then(Auth.getUser);
      })
      .then((user: IUser | null) => ({ user, e: null }))
      .catch((e: AppError) => ({ e, user: null }))
      .then(({ user, e }: { user: IUser | null; e: AppError | null }) => {
        if (loginSessionId !== loginId) return null;

        if (!user || e) {
          return Auth.logout()
            .catch()
            .then(() => {
              throw e || new AppError('No user returned from login', '100-010');
            });
        }

        // User has logged in, trigger any login actions here, such as updating
        // redux, starting syncs and crons etc

        startSyncCron();
        updateSnoozedCron.start();

        return Auth.setUser(user, true, redirectPath);
      });
  }

  /**
   * Logout the user
   */
  public static logout(withAlert: boolean = false, loginText?: string, maintainStoreUserID?: string | null) {
    /**
     * The actual logout func
     */
    const logout = () => {
      store.dispatch(logoutAction(loginText, maintainStoreUserID));

      analytics.unsetUser();

      return AuthImplementation.logout().then(() => true);
    };

    if (!withAlert) return logout();

    return Alert.confirm('Logout.Confirm').then((confirmed) => {
      if (confirmed) return logout().then(() => true);

      return Promise.resolve(false);
    });
  }

  /**
   * Cancel the last login attempt
   */
  public static cancel() {
    loginId += 1;
  }

  /**
   * Force the user to login again, maintaining the store if they login again
   * successfully
   */
  public static relogin() {
    return Auth.logout(false, marketingCopy.get('Login.Relogin'), store.getState().user.id);
  }

  /**
   * Refresh the id token in the background
   */
  public static refreshIdToken() {
    return AuthImplementation.refreshIdToken();
  }
}

export default Auth;
