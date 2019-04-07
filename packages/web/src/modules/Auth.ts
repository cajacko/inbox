import * as firebase from 'firebase/app';
import 'firebase/auth';
import AppError from 'src/lib/modules/AppError';
import { setIdToken } from 'src/lib/store/user/actions';
import { IUser } from 'src/lib/types/general';
import store from 'src/lib/utils/store';
import testHook from 'src/utils/testHook';

const key = 'AIzaSyCeijQDNI7C-3cH3JmniHfF7ImLHf8FRV8';

firebase.initializeApp({
  apiKey: key,
  authDomain: 'inbox-981dc.firebaseapp.com',
});

const provider = new firebase.auth.GoogleAuthProvider();

/**
 * Handle login and logout
 */
class Auth {
  /**
   * Is the user logged in
   */
  public static isLoggedIn(): Promise<boolean> {
    return Auth.getUser()
      .then(user => !!user)
      .catch(() => false);
  }

  /**
   * Get the current user
   */
  public static getUser(): Promise<IUser> {
    return Promise.resolve(firebase.auth().currentUser).then((user) => {
      if (!user) {
        throw new AppError(
          'Firebase auth resolved but did not return a user object',
          '100-010'
        );
      }

      return user.getIdToken().then(idToken => ({
        displayName: user.displayName,
        id: user.uid,
        idToken,
        photoURL: user.photoURL,
        refreshToken: user.refreshToken,
      }));
    });
  }

  /**
   * Log the user in
   */
  public static login() {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        const { method, params } = testHook('login', {
          method: 'signInWithPopup',
          params: [provider],
        });

        return firebase.auth()[method](...params);
      });
  }

  /**
   * Logout the user
   */
  public static logout() {
    return firebase.auth().signOut();
  }

  /**
   * Get a new id token using the refresh token
   */
  public static refreshIdToken() {
    return testHook('refreshIdToken', Promise.resolve()).then(() => {
      const { refreshToken } = store.getState().user;

      if (!refreshToken) {
        return Promise.reject(new AppError('No refresh token to use', '100-017'));
      }

      return fetch(`https://securetoken.googleapis.com/v1/token?key=${key}`, {
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      })
        .then(res => res.json())
        .then((data) => {
          if (!data || !data.id_token) {
            throw new AppError('No id token given when refreshing', '100-018');
          }

          store.dispatch(setIdToken(data.id_token));
        });
    });
  }
}

export default Auth;
