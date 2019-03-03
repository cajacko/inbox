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

    this.edit = this.edit.bind(this);
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
   * On snooze, show the menu
   */
  private onSnooze() {
    console.log('onSnooze');
    // Show the modal for it
    // this.props.context.show(SnoozeReminder, {
    //   close: this.props.context.hide,
    //   id: this.props.id,
    // });
  }

  /**
   * Show the add modal
   */
  private edit() {
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
        onSnooze={this.onSnooze}
        onSetDone={this.props.onSetDone}
        edit={this.edit}
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
