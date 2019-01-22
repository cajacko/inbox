import * as React from 'react';
import withRouter from 'src/lib/HOCs/withRouter';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import { RouteComponentProps } from 'src/packages/react-router';
import Login from './Login.render';

interface IState {
  errorText?: TextType;
  loggingIn: boolean;
}

/**
 * Business logic for the login component, handles login and error messages
 */
class LoginComponent extends React.Component<RouteComponentProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      loggingIn: false,
    };

    this.loginSessionId = 0;

    this.login = this.login.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  private loginSessionId: number;

  /**
   * Login the user
   */
  private login() {
    this.loginSessionId += 1;
    const { loginSessionId } = this;

    this.setState({ loggingIn: true });

    Auth.login(this.props.history.push).catch(() => {
      if (loginSessionId !== this.loginSessionId) return;

      this.setState({ errorText: 'Login.GoogleError', loggingIn: false });
    });
  }

  /**
   * Cancel the last login attempt
   */
  private cancel() {
    this.loginSessionId += 1;

    this.setState({ errorText: undefined, loggingIn: false });

    Auth.cancel();
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <Login
        cancel={this.cancel}
        login={this.login}
        errorText={this.state.errorText}
        loggingIn={this.state.loggingIn}
      />
    );
  }
}

export default withRouter(LoginComponent);
