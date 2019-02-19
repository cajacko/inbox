import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import AddReminder, { IPassedProps } from './AddReminder.render';

const TEXT_LIMIT = 100;

export interface IContainerStateProps {
  text?: string;
}

export interface IContainerDispatchProps {
  save: (value: string, id?: string) => void;
  delete: (id: string) => void;
  done: (id: string) => void;
}

interface IProps
  extends IPassedProps,
    IContainerDispatchProps,
    IContainerStateProps {}

interface IState {
  value: string;
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
    this.props.save(this.state.value, this.props.id);
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
  private onDone() {
    this.props.close();

    if (!this.props.id) return;

    this.props.done(this.props.id);
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

export default AddReminderComponent;
