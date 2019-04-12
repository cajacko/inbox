import * as React from 'react';
import { compose } from 'redux';
import { TextInputRef } from 'src/components/TextInput';
import Repeat from 'src/lib/components/Repeat';
import Snooze from 'src/lib/components/Snooze';
import * as RepeatModal from 'src/lib/context/RepeatModal';
import * as SnoozeModal from 'src/lib/context/SnoozeModal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import { IValue } from 'src/lib/HOCs/withModalContext';
import AddReminder, { IPassedProps } from './AddReminder.render';

// Browsers prefer link lengths under 2048, added 100 to it
const TEXT_LIMIT = 2148;

export interface IContainerStateProps {
  isDone: boolean;
  isSnoozed: boolean;
  text?: string;
  onSetDueDate: (id: string, time: number) => void;
  isRepeated: boolean;
}

export interface IContainerDispatchProps {
  save: (value: string, dueDate?: number, id?: string) => void;
  delete: (id: string) => void;
  setDone: (id: string, val: boolean) => void;
}

interface IProps
  extends IPassedProps,
    IContainerDispatchProps,
    IContainerStateProps {
  snoozeModal: IValue;
  repeatModal: IValue;
}

interface IState {
  value: string;
  dueDate?: number;
}

/**
 * Business logic for the add reminder component
 */
class AddReminderComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.text || '',
    };

    this.input = null;

    this.setInputRef = this.setInputRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSnooze = this.onSnooze.bind(this);
    this.onRepeat = this.onRepeat.bind(this);
  }

  /**
   * When the component mounts, focus on the input
   */
  public componentDidMount() {
    if (this.input) this.input.focus();
  }

  /**
   * When the input changes update the value
   */
  private onChange(value: string) {
    if (value.length > TEXT_LIMIT) return;

    this.setState({ value });
  }

  /**
   * When the save button is pressed, close the modal and save
   */
  private onSave() {
    if (this.isDisabled()) return;

    this.props.close();
    this.props.save(this.state.value, this.state.dueDate, this.props.id);
  }

  /**
   * When the delete button is pressed, close the modal and delete
   */
  private onDelete() {
    this.props.close();

    if (!this.props.id) return;

    this.props.delete(this.props.id);
  }

  /**
   * When the done button is pressed, close the modal and mark as done
   */
  private onDone(isDone: boolean) {
    return () => {
      this.props.close();

      if (!this.props.id) return;

      this.props.setDone(this.props.id, isDone);
    };
  }

  /**
   * Show the snooze modal for this reminder
   */
  private onSnooze() {
    this.props.snoozeModal.show(Snooze, {
      close: this.props.snoozeModal.hide,
      id: this.props.id,
      setDueDate: (dueDate: number) => {
        if (this.props.id) {
          this.props.close(true);
          this.props.onSetDueDate(this.props.id, dueDate);
        } else {
          this.setState({ dueDate });
        }
      },
    });
  }

  /**
   * Show the repeat modal
   */
  private onRepeat() {
    this.props.repeatModal.show(Repeat, {
      close: this.props.repeatModal.hide,
      id: this.props.id,
    });
  }

  /**
   * Set the input ref
   */
  private setInputRef(ref: TextInputRef | null) {
    this.input = ref;
  }

  /**
   * Should the button be disabled
   */
  private isDisabled() {
    return this.state.value === '';
  }

  private input: TextInputRef | null;

  /**
   * Render the component
   */
  public render() {
    return (
      <AddReminder
        isRepeated={!!this.props.isRepeated}
        isSnoozed={!!this.props.isSnoozed || !!this.state.dueDate}
        onSnooze={this.onSnooze}
        onRepeat={this.onRepeat}
        isDone={!!this.props.isDone}
        onDone={this.onDone}
        setInputRef={this.setInputRef}
        onChange={this.onChange}
        value={this.state.value}
        saveDisabled={this.isDisabled()}
        onSave={this.onSave}
        fullScreen={this.props.fullScreen}
        close={this.props.close}
        isNew={!this.props.id}
        onDelete={this.onDelete}
      />
    );
  }
}

export default compose(
  withConsumer(SnoozeModal.Consumer, 'snoozeModal'),
  withConsumer(RepeatModal.Consumer, 'repeatModal')
)(AddReminderComponent);
