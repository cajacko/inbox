import AppError from 'src/lib/modules/AppError';
import { logout, setIsLoggedIn } from 'src/lib/store/user/actions';
import { IUser } from 'src/lib/types/general';
import analytics from 'src/lib/utils/analytics';
import history from 'src/lib/utils/history';
import store from 'src/lib/utils/store';
import AuthImplementation from 'src/modules/Auth';
import testHook from 'src/utils/testHook';

let loginId = 0;

/**
 * Handle login and logout
 */
class Auth {
  /**
   * Is the user logged in
   */
  public static isLoggedIn() {
    return AuthImplementation.isLoggedIn();
  }

  /**
   * Get the current user
   */
  public static getUser(): Promise<IUser | null> {
    return AuthImplementation.getUser()
      .then((user) => {
        analytics.setUserIfNotSet({ userId: user.id });

        return user;
      })
      .catch(() => null);
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

        analytics.setUserIfNotSet({ userId: user.id });

        store.dispatch(setIsLoggedIn(true, user));

        history.push(redirectPath || '/');

        return Promise.resolve(user);
      });
  }

  /**
   * Logout the user
   */
  public static logout() {
    store.dispatch(logout());

    analytics.unsetUser();

    return AuthImplementation.logout();
  }

  /**
   * Cancel the last login attempt
   */
  public static cancel() {
    loginId += 1;
  }
}

export default Auth;
