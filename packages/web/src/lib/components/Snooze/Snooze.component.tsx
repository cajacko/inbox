import * as React from 'react';
import Briefcase from 'src/lib/assets/icons/Briefcase';
import BusinessTime from 'src/lib/assets/icons/BusinessTime';
import Couch from 'src/lib/assets/icons/Couch';
import Moon from 'src/lib/assets/icons/Moon';
import Sun from 'src/lib/assets/icons/Sun';
import CustomDate from 'src/lib/modules/CustomDate';
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

    this.state = {
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
    console.log('onSelectDateAndTime');
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
   * Render the component
   */
  public render() {
    return (
      <Snooze
        type={this.state.type}
        onSelectDateAndTime={this.onSelectDateAndTime}
        suggestions={this.state.suggestions}
      />
    );
  }
}

export default SnoozeComponent;
