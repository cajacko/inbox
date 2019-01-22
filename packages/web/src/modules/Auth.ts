import * as firebase from 'firebase/app';
import 'firebase/auth';
import AppError from 'src/lib/modules/AppError';
import { IUser } from 'src/lib/types/general';
import testHook from 'src/utils/testHook';

firebase.initializeApp({
  apiKey: 'AIzaSyCeijQDNI7C-3cH3JmniHfF7ImLHf8FRV8',
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
    return Promise.resolve(!!Auth.getUser());
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

      return {
        displayName: user.displayName,
        id: user.uid,
        photoURL: user.photoURL,
      };
    });
  }

  /**
   * Log the user in
   */
  public static login() {
    const { method, params } = testHook('login', {
      method: 'signInWithPopup',
      params: [provider],
    });

    return firebase.auth()[method](...params);
  }

  /**
   * Logout the user
   */
  public static logout() {
    return firebase.auth().signOut();
  }
}

export default Auth;
