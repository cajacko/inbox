import * as React from 'react';
import CustomDate from 'src/lib/modules/CustomDate';
import { RepeatTypes } from 'src/lib/store/reminders/reducer';
import Repeat, { IProps as IRenderProps } from './Repeat.render';

export interface IContainerDispatchProps {
  onSetRepeat: (type: RepeatTypes, startDate: number, id: string) => void;
  onRemoveRepeat: (id: string) => void;
}

export interface IContainerStateProps {
  repeatText: string;
}

export interface IPassedProps {
  id?: string;
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IContainerDispatchProps {
  fullScreen: boolean;
  close: () => void;
}

interface IState {
  type: IRenderProps['type'];
}

/**
 * Business logic for the repeat component
 */
class RepeatComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 'INIT',
    };

    this.setType = this.setType.bind(this);
    this.onSetStartDate = this.onSetStartDate.bind(this);
    this.onOpenRepeatStartDate = this.onOpenRepeatStartDate.bind(this);
  }

  /**
   * Set the repeat details
   */
  private onOpenRepeatStartDate(type: RepeatTypes | 'NO_REPEAT') {
    return () => {
      this.type = type;

      this.setState({ type: 'CUSTOM_DATE_TIME' });
    };
  }

  /**
   * When the start date is selected submit everything
   */
  private onSetStartDate(startDate: CustomDate) {
    this.props.close();

    // TODO: Handle this
    if (!this.props.id) return;

    if (this.type === 'NO_REPEAT') {
      this.props.onRemoveRepeat(this.props.id);
      return;
    }

    this.props.onSetRepeat(this.type, startDate.getTime(), this.props.id);
  }

  /**
   * Set the state type
   */
  private setType(type: IState['type']) {
    return () => {
      this.setState({ type });
    };
  }

  private type: RepeatTypes | 'NO_REPEAT';

  /**
   * Render the component
   */
  public render() {
    return (
      <Repeat
        text={this.props.repeatText}
        type={this.state.type}
        setType={this.setType}
        onOpenRepeatStartDate={this.onOpenRepeatStartDate}
        onSetStartDate={this.onSetStartDate}
      />
    );
  }
}

export default RepeatComponent;
