import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import AddReminder, { IPassedProps } from './AddReminder.render';

const TEXT_LIMIT = 100;

type IProps = IPassedProps;

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
      value: '',
    };

    this.input = null;

    this.setInputRef = this.setInputRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.onSave = this.onSave.bind(this);
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
        setInputRef={this.setInputRef}
        onChange={this.onChange}
        value={this.state.value}
        saveDisabled={this.isDisabled()}
        onSave={this.onSave}
        {...this.props}
      />
    );
  }
}

export default AddReminderComponent;
