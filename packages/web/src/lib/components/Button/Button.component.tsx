import * as React from 'react';
import analytics from 'src/lib/utils/analytics';
import Button, { IPassedDownProps } from './Button.render';

interface IProps extends IPassedDownProps {
  analyticsAction: string;
  analyticsCategory: string;
  analyticsLabel?: string;
  analyticsValue?: number;
}

interface IState {
  isHovering: boolean;
}

/**
 * Business logic for the button component
 */
class ButtonComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      isHovering: false,
    };

    this.action = this.action.bind(this);
    this.onMouseIn = this.onMouseIn.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  /**
   * When the mouse enters, set the hover status
   */
  private onMouseIn() {
    if (this.state.isHovering) return;

    this.setState({ isHovering: true });
  }

  /**
   * When the mouse leaves, set the hover status
   */
  private onMouseOut() {
    if (!this.state.isHovering) return;

    this.setState({ isHovering: false });
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
    return (
      <Button
        action={this.action}
        isHovering={this.state.isHovering}
        buttonEvents={{
          onMouseEnter: this.onMouseIn,
          onMouseLeave: this.onMouseOut,
          onMouseMove: this.onMouseIn,
          onMouseOut: this.onMouseOut,
          onMouseOver: this.onMouseIn,
        }}
        {...this.props}
      />
    );
  }
}

export default ButtonComponent;
