import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import { Text } from 'src/lib/types/general';
import errors from 'src/lib/utils/errors';
import getButtonType from 'src/lib/utils/getButtonType';

interface IState {
  buttons: Array<{
    key: string;
    action: () => () => void;
    text: () => Text;
    analyticsAction: string;
    analyticsCategory: string;
  }>;
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
    const buttons = [
      {
        action: () => () => props.history.push('/'),
        analyticsAction: 'GO HOME',
        analyticsCategory: '404',
        key: 'goToHome',
        text: () => 'Navigation.GoToHome',
        type: getButtonType('CONTAINED.PRIMARY'),
      },
    ];

    /**
     * Does this history have more than 1 route in it
     */
    const check = ({ history: { length } }: RouteComponentProps) => length > 2;

    if (init === false && check(this.props) === check(props)) return this.state;

    if (check(props)) {
      buttons.push({
        action: () => () => props.history.goBack(),
        analyticsAction: 'GO BACK',
        analyticsCategory: '404',
        key: 'goBack',
        text: () => 'Navigation.GoBack',
        type: getButtonType('CONTAINED.SECONDARY'),
      });
    }

    return { buttons };
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <ErrorBoundary
        defaultError={errors.getError('100-002')}
        error={errors.getError('100-002')}
        buttons={this.state.buttons}
      />
    );
  }
}

export default withRouter(FourOhFour);
