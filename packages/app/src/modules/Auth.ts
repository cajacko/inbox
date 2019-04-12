import firebase, { RNFirebase } from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import AppError from 'src/lib/modules/AppError';

export type FirebaseUser = RNFirebase.User;

GoogleSignin.configure();

/**
 * Handle login and logout
 */
class Auth {
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
   * Return the firebase auth object
   */
  public static getAuth() {
    return firebase.auth();
  }
}

export default Auth;
