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
    return Promise.reject(new Error('No login yet'));
  }

  /**
   * Log the user in
   */
  public static login() {
    // eslint-disable-next-line
    console.log('login');

    return Promise.reject(new Error('No login yet'));
  }

  /**
   * Logout the user
   */
  public static logout() {
    // eslint-disable-next-line
    console.log('logout');

    return Promise.reject(new Error('No logout yet'));
  }
}

export default Auth;
