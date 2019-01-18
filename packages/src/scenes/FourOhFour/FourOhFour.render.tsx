import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import withRouter from 'src/lib/HOCs/withRouter';
import { Text } from 'src/lib/types/general';
import errors from 'src/lib/utils/errors';
import { RouteComponentProps } from 'src/packages/react-router';

interface IState {
  action: () => () => void;
  actionText: () => Text;
}

/**
 * 404 scene for unknown routes
 */
class FourOhFour extends React.Component<RouteComponentProps, IState> {
  /**
   * Set the initial state
   */
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = this.getState(props, true);
  }

  /**
   * Update the state when new props come in
   */
  public componentWillReceiveProps(props: RouteComponentProps) {
    this.setState(this.getState(props, false));
  }

  /**
   * Get the state from the props
   */
  private getState(props: RouteComponentProps, init: boolean) {
    /**
     * Check for which action to use
     */
    const check = ({ history: { length } }: RouteComponentProps) => length > 1;

    if (init === false && check(this.props) === check(props)) return this.state;

    if (check(props)) {
      return {
        action: () => () => props.history.goBack(),
        actionText: () => 'Navigation.GoBack',
      };
    }

    return {
      action: () => () => props.history.push('/'),
      actionText: () => 'Navigation.GoToHome',
    };
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <ErrorBoundary
        defaultError={errors.getError('100-002')}
        error={errors.getError('100-002')}
        action={this.state.action}
        actionText={this.state.actionText}
      />
    );
  }
}

export default withRouter(FourOhFour);
