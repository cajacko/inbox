import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import AppError from 'src/lib/modules/AppError';

GoogleSignin.configure();

/**
 * Handle login and logout
 */
class Auth {
  /**
   * Is the user logged in
   */
  public static isLoggedIn() {
    return Auth.getUser()
      .then(user => !!user)
      .catch(() => false);
  }

  /**
   * Get the user object
   */
  public static getUser() {
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
      }));
    });
  }

  /**
   * Log the user in
   */
  public static login() {
    return GoogleSignin.signIn().then((data) => {
      if (!data.accessToken) {
        throw new AppError(
          'No accessToken returned from google signin',
          '100-003'
        );
      }

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      return firebase.auth().signInWithCredential(credential);
    });
  }

  /**
   * Logout the user
   */
  public static logout() {
    return firebase.auth().signOut();
  }
}

export default Auth;
