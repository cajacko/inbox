import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import AddReminder, { IPassedProps } from './AddReminder.render';

type IProps = IPassedProps;

/**
 * Business logic for the add reminder component
 */
class AddReminderComponent extends React.Component<IProps> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.input = null;

    this.setInputRef = this.setInputRef.bind(this);
  }

  /**
   * When the component mounts, focus on the input
   */
  public componentDidMount() {
    if (this.input) this.input.focus();
  }

  /**
   * Set the input ref
   */
  private setInputRef(ref: TextInputRef | null) {
    this.input = ref;
  }

  private input: TextInputRef | null;

  /**
   * Render the component
   */
  public render() {
    return <AddReminder setInputRef={this.setInputRef} {...this.props} />;
  }
}

export default AddReminderComponent;
