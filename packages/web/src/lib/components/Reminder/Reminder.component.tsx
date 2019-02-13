import * as React from 'react';
import AddReminder from 'src/lib/components/AddReminder';
import * as Modal from 'src/lib/context/Modal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import Reminder, {
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';

interface IProps extends IPassedProps, IContainerStateProps {
  context: Modal.IValue;
}

/**
 * Business logic for the reminder component, handles showing the modal
 */
class ReminderComponent extends React.Component<IProps> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.add = this.add.bind(this);
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
    return <Reminder add={this.add} {...this.props} />;
  }
}

export default withConsumer(Modal.Consumer)(ReminderComponent);
