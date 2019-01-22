import AppError from 'src/lib/modules/AppError';
import { logout, setIsLoggedIn } from 'src/lib/store/user/actions';
import { IUser } from 'src/lib/types/general';
import store from 'src/lib/utils/store';
import AuthImplementation from 'src/modules/Auth';
import { RouteComponentProps } from 'src/packages/react-router';

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
    return AuthImplementation.getUser().catch(() => null);
  }

  /**
   * Log the user in
   */
  public static login(
    push: RouteComponentProps['history']['push'],
    path?: string
  ) {
    return Auth.getUser()
      .then((user: IUser | null) => {
        if (user) return user;

        return AuthImplementation.login().then(Auth.getUser);
      })
      .then((user: IUser | null) => ({ user, e: null }))
      .catch((e: AppError) => ({ e, user: null }))
      .then(({ user, e }: { user: IUser | null; e: AppError | null }) => {
        if (!user || e) {
          return Auth.logout()
            .catch()
            .then(() => {
              throw e || new AppError('No user returned from login', '100-010');
            });
        }

        store.dispatch(setIsLoggedIn(!!user, user));

        push(path || '/');

        return Promise.resolve(user);
      });
  }

  /**
   * Logout the user
   */
  public static logout() {
    store.dispatch(logout());

    return AuthImplementation.logout();
  }
}

export default Auth;
