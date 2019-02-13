import * as React from 'react';
import AddReminder from 'src/lib/components/AddReminder';
import * as Modal from 'src/lib/context/Modal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import Reminder, {
  IContainerDispatchProps,
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';

interface IState {
  isHovering: boolean;
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IContainerDispatchProps {
  context: Modal.IValue;
}

/**
 * Business logic for the reminder component, handles showing the modal
 */
class ReminderComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      isHovering: false,
    };

    this.add = this.add.bind(this);
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
   * Show the add modal
   */
  private add() {
    this.props.context.show(AddReminder, {
      close: this.props.context.hide,
      id: this.props.id,
    });
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <Reminder
        {...this.props}
        add={this.add}
        isHovering={this.state.isHovering}
        buttonEvents={{
          onMouseEnter: this.onMouseIn,
          onMouseLeave: this.onMouseOut,
          onMouseMove: this.onMouseIn,
          onMouseOver: this.onMouseIn,
        }}
      />
    );
  }
}

export default withConsumer(Modal.Consumer)(ReminderComponent);
