import * as React from 'react';
import { compose } from 'redux';
import AddReminder from 'src/lib/components/AddReminder';
import Repeat from 'src/lib/components/Repeat';
import Snooze from 'src/lib/components/Snooze';
import * as AddReminderModal from 'src/lib/context/AddReminderModal';
import * as RepeatModal from 'src/lib/context/RepeatModal';
import * as SnoozeModal from 'src/lib/context/SnoozeModal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import { IValue } from 'src/lib/HOCs/withModalContext';
import Reminder, {
  IContainerDispatchProps,
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';

interface IState {
  showMenu: boolean;
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IContainerDispatchProps {
  addReminderModal: IValue;
  snoozeModal: IValue;
  repeatModal: IValue;
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
      showMenu: false,
    };

    this.edit = this.edit.bind(this);
    this.onSnooze = this.onSnooze.bind(this);
    this.onMouseIn = this.onMouseIn.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.parseUrl = this.parseUrl.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onRepeat = this.onRepeat.bind(this);
  }

  /**
   * When the mouse enters, set the hover status
   */
  private onMouseIn() {
    this.isHovering = true;

    if (this.state.showMenu) return;

    this.setState({ showMenu: true });
  }

  /**
   * When the mouse leaves, set the hover status
   */
  private onMouseOut() {
    this.isHovering = false;

    if (!this.state.showMenu) return;

    this.setState({ showMenu: false });
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
   * When we do a long press on the reminder we want to toggle the menu, unless
   * we're on a device that supports hovering, in which case we don't care about
   * manually toggling the menu
   */
  private onLongPress() {
    // If we're hovering do nothing, as we don't want manual toggling of the
    // menu if we can hover
    if (this.isHovering) {
      return;
    }

    // We are not hovering yet we pressed the reminder, this must be a device
    // that does not support hovering. So toggle the menu
    this.setState({ showMenu: !this.state.showMenu });
  }

  /**
   * When we press a reminder show the edit view. Unless we're not hovering and
   * the menu is already showing, which means we're on a device that doesn't
   * support hovering and the menu must have been manually toggled via the
   * longPress so hide the menu
   */
  private onPress() {
    // If we're not hovering and the menu is showing we must have done a long
    // press to show it, so hide it
    if (!this.isHovering && this.state.showMenu) {
      this.setState({ showMenu: false });
      return;
    }

    this.edit();
  }

  /**
   * On repeat, show the modal to handle it
   */
  private onRepeat() {
    // Show the modal for it
    this.props.repeatModal.show(Repeat, {
      close: this.props.repeatModal.hide,
      id: this.props.id,
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
   * Parse the url from the text, if it exists
   */
  private parseUrl() {
    // eslint-disable-next-line
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    if (!this.props.text) return undefined;

    const results = this.props.text.match(regex);

    if (results && results[0]) {
      return results[0];
    }

    return undefined;
  }

  private isHovering: boolean = false;

  /**
   * Render the component
   */
  public render() {
    return (
      <Reminder
        {...this.props}
        url={this.parseUrl()}
        onRepeat={this.onRepeat}
        onSnooze={this.onSnooze}
        onSetDone={this.props.onSetDone}
        edit={this.edit}
        onLongPress={this.onLongPress}
        onPress={this.onPress}
        showMenu={this.state.showMenu}
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
  withConsumer(SnoozeModal.Consumer, 'snoozeModal'),
  withConsumer(RepeatModal.Consumer, 'repeatModal')
)(ReminderComponent);
