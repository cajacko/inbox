import * as React from 'react';
import Briefcase from 'src/lib/assets/icons/Briefcase';
import BusinessTime from 'src/lib/assets/icons/BusinessTime';
import Couch from 'src/lib/assets/icons/Couch';
import Moon from 'src/lib/assets/icons/Moon';
import Sun from 'src/lib/assets/icons/Sun';
import CustomDate from 'src/lib/modules/CustomDate';
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

    this.state = {
      customDate: 'Wed 6 Mar',
      customTime: '17:30',
      customTimeLabel: 'Suggestions.Time.Evening',
      suggestedTimes: [
        {
          label: 'Morning',
          onChangeTime: this.onChangeTime,
          time: '06:30',
        },
        {
          label: 'Afternoon',
          onChangeTime: this.onChangeTime,
          time: '12:30',
        },
        {
          label: 'Evening',
          onChangeTime: this.onChangeTime,
          time: '17:30',
        },
        {
          label: 'Customised',
          onChangeTime: () => {
            this.setState({ type: 'TIME' });
          },
        },
      ],
      suggestions: [
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: Moon,
          key: 'laterToday',
          testID: 'Suggestion--LaterToday',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Later Today' },
        },
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: Sun,
          key: 'tomorrow',
          testID: 'Suggestion--Tomorrow',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Tomorrow' },
        },
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: Briefcase,
          key: 'laterThisWeek',
          testID: 'Suggestion--LaterThisWeek',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Later This Week' },
        },
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: Couch,
          key: 'thisWeekend',
          testID: 'Suggestion--ThisWeekend',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'This Weekend' },
        },
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: BusinessTime,
          key: 'nextWeek',
          testID: 'Suggestion--NextWeek',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Next Week' },
        },
        {
          action: this.onSelectDate(new CustomDate(CustomDate.now() + 360000)),
          icon: Couch,
          key: 'nextWeekend',
          testID: 'Suggestion--NextWeekend',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Next Weekend' },
        },
      ],
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
      />
    );
  }
}

export default SnoozeComponent;
