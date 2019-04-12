import * as React from 'react';
import CustomDate from 'src/lib/modules/CustomDate';
import { getDates } from 'src/lib/utils/getSnoozeSuggestions';
import Snooze, { IProps as RenderProps, ISuggestion } from './Snooze.render';

interface IProps {
  fullScreen: boolean;
  close: () => void;
  setDueDate: (time: number) => void;
}

interface IState {
  type: RenderProps['type'];
  suggestions: ISuggestion[];
}

/**
 * Business logic for the snooze component
 */
class SnoozeComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.onSelectDate = this.onSelectDate.bind(this);
    this.onSelectCustomDateTime = this.onSelectCustomDateTime.bind(this);
    this.onBack = this.onBack.bind(this);

    this.lastType = 'SUGGESTIONS';

    this.state = {
      suggestions: getDates(this.onSelectDate),
      type: this.lastType,
    };
  }

  /**
   * Save the last type
   */
  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevState.type !== this.lastType) {
      this.lastType = prevState.type;
    }
  }

  /**
   * When we select the date time button, show the custom date time component
   */
  private onSelectCustomDateTime() {
    this.setState({ type: 'CUSTOM_DATE_TIME' });
  }

  /**
   * When a date is selected, close the modal and set the due date
   */
  private onSelectDate(date: CustomDate) {
    return () => {
      this.props.close();
      this.props.setDueDate(date.getTime());
    };
  }

  /**
   * The date and time has been set so call the single func to handle this
   */
  private onSetDateTime(date: CustomDate) {
    this.onSelectDate(date)();
  }

  /**
   * Go to the last type we were on
   */
  private onBack() {
    this.setState({ type: this.lastType });
  }

  private lastType: IState['type'];

  /**
   * Render the component
   */
  public render() {
    return (
      <Snooze
        type={this.state.type}
        onSelectCustomDateTime={this.onSelectCustomDateTime}
        suggestions={this.state.suggestions}
        onSetDateTime={this.onSetDateTime}
        onBack={this.onBack}
      />
    );
  }
}

export default SnoozeComponent;
