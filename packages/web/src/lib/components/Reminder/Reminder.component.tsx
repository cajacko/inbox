import * as React from 'react';
import { Ref } from 'src/components/SwipeRow';
import AddReminder from 'src/lib/components/AddReminder';
import * as Modal from 'src/lib/context/Modal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import Animated from 'src/packages/animated';
import unit from 'src/utils/unit';
import Reminder, {
  IContainerDispatchProps,
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';
import { REMINDER_HEIGHT } from './Reminder.style';

interface IState {
  isHovering: boolean;
  showSwiper: boolean;
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
      showSwiper: true,
    };

    this.heightAnimation = new Animated.Value(1);

    this.edit = this.edit.bind(this);
    this.onMouseIn = this.onMouseIn.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.setSwipeRef = this.setSwipeRef.bind(this);
    this.onRowOpen = this.onRowOpen.bind(this);
    this.onRowDidClose = this.onRowDidClose.bind(this);
    this.onSetDone = this.onSetDone.bind(this);
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
   * When the row closes, check if we should dispatch the action, and do it if
   * so
   */
  private onRowDidClose() {
    if (this.markAsDoneOnClose) {
      this.onSetDone(!this.props.isDone)();
    }
  }

  /**
   * When the swiper row opens, indicate we've opened it, then close the row
   */
  private onRowOpen() {
    if (this.swipeRef && this.swipeRef.closeRow) {
      this.markAsDoneOnClose = true;
      this.swipeRef.closeRow();
    } else {
      this.markAsDoneOnClose = false;
      this.onSetDone(!this.props.isDone)();
    }
  }

  /**
   * Mark the reminder as done
   */
  private onSetDone(isDone: boolean) {
    return () => {
      this.animateClose().then(() => {
        this.markAsDoneOnClose = false;
        this.props.onSetDone(isDone)();
      });
    };
  }

  /**
   * On snooze, show the menu
   */
  private onSnooze() {
    // Show the modal for it
    // this.props.context.show(SnoozeReminder, {
    //   close: this.props.context.hide,
    //   id: this.props.id,
    // });
  }

  /**
   * Set the swiper ref
   */
  private setSwipeRef(ref: Ref) {
    this.swipeRef = ref;
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
   * Animate the reminder to close
   */
  private animateClose() {
    return new Promise((resolve) => {
      this.setState({ showSwiper: false }, () => {
        Animated.timing(this.heightAnimation, {
          duration: 250,
          toValue: 0,
        }).start(() => {
          resolve();
        });
      });
    });
  }

  private swipeRef: Ref;
  private markAsDoneOnClose: boolean = false;
  private heightAnimation: Animated.Value;

  /**
   * Render the component
   */
  public render() {
    const height = this.heightAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [unit(0), unit(REMINDER_HEIGHT)],
    });

    return (
      <Reminder
        {...this.props}
        onSnooze={this.onSnooze}
        height={height}
        onSetDone={this.onSetDone}
        showSwiper={this.state.showSwiper}
        setSwipeRef={this.setSwipeRef}
        onRowOpen={this.onRowOpen}
        onRowDidClose={this.onRowDidClose}
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
