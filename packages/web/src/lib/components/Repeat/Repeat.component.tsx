import * as React from 'react';
import Repeat, { IProps as IRenderProps } from './Repeat.render';

export interface IContainerDispatchProps {
  onSetRepeat: (payload: any) => void;
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
    this.onSetRepeat = this.onSetRepeat.bind(this);
  }

  /**
   * Set the repeat details
   */
  private onSetRepeat(payload: any) {
    return () => {
      this.props.close();

      this.props.onSetRepeat(payload);
    };
  }

  /**
   * Set the state type
   */
  private setType(type: IState['type']) {
    return () => {
      this.setState({ type });
    };
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <Repeat
        text={this.props.repeatText}
        type={this.state.type}
        setType={this.setType}
        onSetRepeat={this.onSetRepeat}
      />
    );
  }
}

export default RepeatComponent;
