import * as React from 'react';
import { Text } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import ErrorBoundary from './ErrorBoundary.render';

interface IProps {
  children: Children;
}

interface IState {
  hasError: boolean;
  title?: Text;
  message?: Text;
  code?: Text;
  action?: () => void;
  actionText?: Text;
}

/**
 * Business logic for the error boundary component, handles when the children
 * crashes and decides what code, title, message and actions to display. Will
 * also fire off error logs
 */
class ErrorBoundaryComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      action: () => null,
      actionText: { _textFromConst: 'Action' },
      code: { _textFromConst: 'Error Code' },
      hasError: true,
      message: { _textFromConst: 'Error message' },
      title: { _textFromConst: 'Error title' },
    };
  }

  /**
   * Render the component
   */
  public render() {
    return <ErrorBoundary {...this.state}>{this.props.children}</ErrorBoundary>;
  }
}

export default ErrorBoundaryComponent;
