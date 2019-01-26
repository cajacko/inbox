import * as React from 'react';
import analytics from 'src/lib/utils/analytics';
import Button, { IProps as RenderProps } from './Button.render';

interface IProps extends RenderProps {
  analyticsAction: string;
  analyticsCategory: string;
  analyticsLabel?: string;
  analyticsValue?: number;
}

/**
 * Business logic for the button component
 */
class ButtonComponent extends React.Component<IProps> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.action = this.action.bind(this);
  }

  /**
   * Run the button action
   */
  private action() {
    if (this.props.action) {
      analytics.trackEvent(
        this.props.analyticsAction,
        this.props.analyticsCategory,
        this.props.analyticsLabel,
        this.props.analyticsValue
      );

      this.props.action();
    }
  }

  /**
   * Render the component
   */
  public render() {
    return <Button {...this.props} action={this.action} />;
  }
}

export default ButtonComponent;
