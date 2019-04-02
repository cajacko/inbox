import * as React from 'react';
import { compose } from 'redux';
import AddReminder from 'src/lib/components/AddReminder';
import Snooze from 'src/lib/components/Snooze';
import * as AddReminderModal from 'src/lib/context/AddReminderModal';
import * as SnoozeModal from 'src/lib/context/SnoozeModal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import { IValue } from 'src/lib/HOCs/withModalContext';
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
  addReminderModal: IValue;
  snoozeModal: IValue;
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
    this.onSnooze = this.onSnooze.bind(this);
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
    // Show the modal for it
    this.props.snoozeModal.show(Snooze, {
      close: this.props.snoozeModal.hide,
      id: this.props.id,
      setDueDate: this.props.onSetDueDate,
    });
  }

  /**
   * Show the add modal
   */
  private edit() {
    this.props.addReminderModal.show(AddReminder, {
      close: this.props.addReminderModal.hide,
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
        url="https://charliejackson.com"
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

export default compose(
  withConsumer(AddReminderModal.Consumer, 'addReminderModal'),
  withConsumer(SnoozeModal.Consumer, 'snoozeModal')
)(ReminderComponent);
