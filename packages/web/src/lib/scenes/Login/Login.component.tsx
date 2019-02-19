import * as React from 'react';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import Login from './Login.render';

export interface IContainerStateProps {
  description?: string;
  isRelogin: boolean;
}

interface IState {
  errorText?: TextType;
  loggingIn: boolean;
}

/**
 * Business logic for the login component, handles login and error messages
 */
class LoginComponent extends React.Component<IContainerStateProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IContainerStateProps) {
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

    Auth.login().catch(() => {
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
        isRelogin={this.props.isRelogin}
        description={this.props.description}
        cancel={this.cancel}
        login={this.login}
        errorText={this.state.errorText}
        loggingIn={this.state.loggingIn}
      />
    );
  }
}

export default LoginComponent;
