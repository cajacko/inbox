import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IRoute } from 'src/lib/types/general';
import Route from './Route.render';

interface IProps extends IRoute, RouteComponentProps {
  isLoggedIn: boolean;
}

interface IState {
  show: boolean;
}

/**
 * Business logic for the route component
 */
class RouteComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      show: this.getShowAndRedirect(props),
    };
  }

  /**
   * When we get new props, see if we should redirect
   */
  public componentWillReceiveProps(nextProps: IProps) {
    const show = this.getShowAndRedirect(nextProps);

    if (show !== this.state.show) {
      this.setState({ show });
    }
  }

  /**
   * Figure out if we should redirect and show the route
   */
  private getShowAndRedirect(props: IProps) {
    if (props.public || props.isLoggedIn) return true;

    if (!props.isLoggedIn) {
      props.history.push('/login');
    }

    return false;
  }

  /**
   * Render the component
   */
  public render() {
    return this.state.show ? <Route {...this.props} /> : null;
  }
}

export default withRouter(RouteComponent);
