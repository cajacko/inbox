import * as firebase from 'firebase/app';
import 'firebase/auth';
import testHook from 'src/utils/testHook';

export type FirebaseUser = firebase.User;

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
   * Return the firebase auth object
   */
  public static getAuth() {
    return firebase.auth();
  }
}

export default Auth;
