import * as React from 'react';
import Button, { IProps } from './Button.render';

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
    // eslint-disable-next-line
    console.log('action');

    if (this.props.action) {
      this.props.action();
    }
  }

  /**
   * Render the component
   */
  public render() {
    return <Button action={this.action} {...this.props} />;
  }
}

export default ButtonComponent;
