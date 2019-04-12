import * as React from 'react';
import CustomDate from 'src/lib/modules/CustomDate';
import getLabelsFromDate from 'src/lib/utils/getLabelsFromDate';
import {
  getDates,
  getInitTime,
  getTimes,
} from 'src/lib/utils/getSnoozeSuggestions';
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
  customDate: CustomDate | null;
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
    this.onBack = this.onBack.bind(this);

    this.lastType = 'SUGGESTIONS';

    this.state = {
      customDate: null,
      suggestedTimes: [],
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
   * When we select the date time button, show the date picker
   */
  private onSelectDateAndTime() {
    this.setState({ type: 'CALENDAR' });
  }

  /**
   * When a date is selected, close the modal and set the due date
   */
  private onSelectDate(date: CustomDate | null) {
    return () => {
      if (!date) return;

      if (date.getTime() < new CustomDate().getTime()) {
        this.setState({ type: 'ERROR' });
        return;
      }

      this.props.close();
      this.props.setDueDate(date.getTime());
    };
  }

  /**
   * When the date is selected show the confirm view
   */
  private onChangeDate(date: CustomDate | null) {
    if (!date) return;

    const newDate = new CustomDate(this.state.customDate || getInitTime(date));

    newDate.setFullYear(date.getFullYear());
    newDate.setMonth(date.getMonth());
    newDate.setDate(date.getDate());

    this.setState({
      customDate: newDate,
      suggestedTimes: this.getSuggestedTimes(newDate),
      type: 'CONFIRM',
    });
  }

  /**
   * Show the time or time suggestions
   */
  private onSelectTime() {
    if (this.state.suggestedTimes.length > 1) {
      this.setState({ type: 'TIME_SUGGESTIONS' });
      return;
    }

    this.setState({ type: 'TIME' });
  }

  /**
   * When the time is selected show the confirm view
   */
  private onChangeTime(date: CustomDate | null) {
    if (!date) return;

    const newDate = new CustomDate(this.state.customDate);

    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());

    this.setState({ type: 'CONFIRM', customDate: newDate });
  }

  /**
   * When the save button is pressed, save the custom date
   */
  private onSave() {
    this.onSelectDate(this.state.customDate)();
  }

  /**
   * Go to the last type we were on
   */
  private onBack() {
    this.setState({ type: this.lastType });
  }

  /**
   * Get the suggested times to display
   */
  private getSuggestedTimes(date: CustomDate) {
    return getTimes(
      date,
      this.onChangeTime,
      () => {
        this.setState({ type: 'TIME' });
      },
      {
        removeSameTime: true,
      }
    );
  }

  private lastType: IState['type'];

  /**
   * Render the component
   */
  public render() {
    const finalDate = this.state.customDate || new CustomDate();

    const { date, time, timeLabel } = getLabelsFromDate(finalDate);

    return (
      <Snooze
        onBack={this.onBack}
        type={this.state.type}
        onSelectDateAndTime={this.onSelectDateAndTime}
        suggestions={this.state.suggestions}
        onChangeDate={this.onChangeDate}
        customDate={date}
        customDateObject={finalDate}
        onSelectTime={this.onSelectTime}
        customTimeLabel={timeLabel}
        customTime={time}
        suggestedTimes={this.state.suggestedTimes}
        onChangeTime={this.onChangeTime}
        onSave={this.onSave}
      />
    );
  }
}

export default SnoozeComponent;
