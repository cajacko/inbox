import * as React from 'react';
import CustomDate from 'src/lib/modules/CustomDate';
import { getDates, getTimes } from 'src/lib/utils/getSnoozeSuggestions';
import Snooze, {
  IProps as RenderProps,
  ISuggestedTimes,
  ISuggestion,
} from './Snooze.render';

interface IProps {
  fullScreen: boolean;
  close: () => void;
  setDueDate: (time: number) => void;
}

interface IState {
  type: RenderProps['type'];
  suggestions: ISuggestion[];
  customDate: string;
  customTimeLabel: string;
  customTime: string;
  suggestedTimes: ISuggestedTimes[];
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
    this.onSelectDateAndTime = this.onSelectDateAndTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSelectTime = this.onSelectTime.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      customDate: 'Wed 6 Mar',
      customTime: '17:30',
      customTimeLabel: 'Suggestions.Time.Evening',
      suggestedTimes: getTimes(this.onChangeTime, () => {
        this.setState({ type: 'TIME' });
      }),
      suggestions: getDates(this.onSelectDate),
      type: 'SUGGESTIONS',
    };
  }

  /**
   * When we select the date time button, show the date picker
   */
  private onSelectDateAndTime() {
    this.setState({ type: 'CALENDAR' });
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
   * When the date is selected show the confirm view
   */
  private onChangeDate() {
    this.setState({ type: 'CONFIRM' });
  }

  /**
   * Show the time or time suggestions
   */
  private onSelectTime() {
    this.setState({ type: 'TIME_SUGGESTIONS' });
  }

  /**
   * When the time is selected show the confirm view
   */
  private onChangeTime() {
    this.setState({ type: 'CONFIRM' });
  }

  /**
   * When the save button is pressed, save the custom date
   */
  private onSave() {
    this.onSelectDate(new CustomDate())();
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <Snooze
        type={this.state.type}
        onSelectDateAndTime={this.onSelectDateAndTime}
        suggestions={this.state.suggestions}
        onChangeDate={this.onChangeDate}
        customDate={this.state.customDate}
        onSelectTime={this.onSelectTime}
        customTimeLabel={this.state.customTimeLabel}
        customTime={this.state.customTime}
        suggestedTimes={this.state.suggestedTimes}
        onChangeTime={this.onChangeTime}
        onSave={this.onSave}
      />
    );
  }
}

export default SnoozeComponent;
