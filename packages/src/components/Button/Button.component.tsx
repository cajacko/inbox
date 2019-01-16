import * as React from "react";
import Button from "./Button.render";

interface IProps {
  text: string;
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
   * Render the component
   */
  public render() {
    return <Button action={this.action} {...this.props} />;
  }

  private action() {
    // tslint:disable-next-line
    console.log("action");
  }
}

export default ButtonComponent;