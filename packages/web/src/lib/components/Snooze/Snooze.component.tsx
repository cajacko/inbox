import * as React from 'react';
import Briefcase from 'src/lib/assets/icons/Briefcase';
import BusinessTime from 'src/lib/assets/icons/BusinessTime';
import Couch from 'src/lib/assets/icons/Couch';
import Moon from 'src/lib/assets/icons/Moon';
import Sun from 'src/lib/assets/icons/Sun';
import Snooze, { IProps as RenderProps, ISuggestion } from './Snooze.render';

interface IProps {
  fullScreen: boolean;
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

    this.state = {
      suggestions: [
        {
          action: () => {
            console.log('Later Today');
          },
          icon: Moon,
          key: 'laterToday',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Later Today' },
        },
        {
          action: () => {
            console.log('Tomorrow');
          },
          icon: Sun,
          key: 'tomorrow',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Tomorrow' },
        },
        {
          action: () => {
            console.log('Later This Week');
          },
          icon: Briefcase,
          key: 'laterThisWeek',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Later This Week' },
        },
        {
          action: () => {
            console.log('This Weekend');
          },
          icon: Couch,
          key: 'thisWeekend',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'This Weekend' },
        },
        {
          action: () => {
            console.log('Next Week');
          },
          icon: BusinessTime,
          key: 'nextWeek',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Next Week' },
        },
        {
          action: () => {
            console.log('Next Weekend');
          },
          icon: Couch,
          key: 'nextWeekend',
          text: { _textFromConst: 'Mon 06:45' },
          title: { _textFromConst: 'Next Weekend' },
        },
      ],
      type: 'SUGGESTIONS',
    };
  }

  private onSelectDateAndTime() {
    console.log('onSelectDateAndTime');
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
