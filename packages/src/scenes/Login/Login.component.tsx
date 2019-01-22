import * as React from 'react';
import withRouter from 'src/lib/HOCs/withRouter';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import { RouteComponentProps } from 'src/packages/react-router';
import Login from './Login.render';

interface IState {
  errorText?: TextType;
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

    this.state = {};

    this.login = this.login.bind(this);
  }

  /**
   * Login the user
   */
  private login() {
    Auth.login(this.props.history.push).catch(() => {
      this.setState({ errorText: 'Login.GoogleError' });
    });
  }

  /**
   * Render the component
   */
  public render() {
    return <Login login={this.login} errorText={this.state.errorText} />;
  }
}

export default withRouter(LoginComponent);
