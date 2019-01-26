/* eslint max-lines: 0 */
import * as React from 'react';
import { IType } from 'src/lib/config/styles/buttons';
import AppError from 'src/lib/modules/AppError';
import SplashScreen from 'src/lib/modules/SplashScreen';
import { IExtendedError, Text } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import errors from 'src/lib/utils/errors';
import marketingCopy from 'src/lib/utils/marketingCopy';
import propsWithoutChildren from 'src/lib/utils/propsWithoutChildren';
import logger from 'src/utils/logger';
import ErrorBoundary from './ErrorBoundary.render';

interface IState {
  hasError: boolean;
  title?: string;
  message?: string;
  code?: string;
}

interface IProps {
  children?: Children;
  defaultError: IExtendedError;
  error?: IExtendedError;
  buttons?: Array<{
    key: string;
    action: (state: IState) => () => void;
    text: (state: IState) => Text;
    type?: IType;
    analyticsAction: string;
    analyticsCategory: string;
  }>;
}

interface ILoggerProps {
  error?: AppError;
  errorObject?: IExtendedError | null;
  info?: any;
  props?: { [key: string]: any };
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

    this.defaultErrorObj = this.getErrorObj(props.defaultError);

    this.defaultState = {
      code: undefined,
      hasError: false,
      message: undefined,
      title: undefined,
    };

    this.state = this.defaultState;

    if (props.error) {
      const errorObj = this.getErrorObj(props.error);
      this.state = this.handleStateChange(this.state, errorObj, false);
    }
  }

  /**
   * When the component gets new props see if we should update the state
   */
  public componentWillReceiveProps(props: IProps) {
    this.defaultErrorObj = this.getErrorObj(props.defaultError);

    if (props.error) {
      const errorObj = this.getErrorObj(props.error);
      this.handleStateChange(this.state, errorObj, true);
    } else if (this.state.hasError) {
      this.setState(this.defaultState);
    }
  }

  /**
   * Return the error state to use
   */
  private getErrorObj(
    errorObj?: IExtendedError | null,
    error?: AppError,
    info?: any
  ): IExtendedError {
    try {
      if (errorObj) {
        return errorObj;
      } else if (error) {
        const errorBoundaryError = errors.getErrorBoundaryError(
          error,
          info,
          this.props
        );

        if (errorBoundaryError) return errorBoundaryError;
      }

      return this.defaultErrorObj;
    } catch (e) {
      if (errorObj) return errorObj;

      return this.defaultErrorObj;
    }
  }

  private defaultState: IState;

  /**
   * When the children in the component throw an error, set the state with the
   * correct error props
   */
  public componentDidCatch(error: AppError, info: any) {
    const errorObj = this.getErrorObj(null, error, info);
    this.handleStateChange(this.state, errorObj, true, error, info);
  }

  /**
   * Decide whether the state has changed and setState as necessary, otherwise
   * do nothing except return the current state
   */
  private handleStateChange(
    existingState: IState | null,
    newState: IExtendedError | null,
    shouldSetState: boolean,
    error?: AppError,
    info?: any
  ): IState {
    /**
     * Has the state changed
     */
    const hasChanged = () => {
      if (!existingState) return true;
      if (existingState.hasError !== !!newState) return true;
      if (newState && existingState.code !== newState.code) return true;

      return false;
    };

    if (!hasChanged() && existingState) return existingState;

    const state = newState
      ? {
        code: newState.code,
        hasError: true,
        message: newState.message,
        title: newState.title,
      }
      : {
        code: undefined,
        hasError: false,
        message: undefined,
        title: undefined,
      };

    if (state.hasError) {
      SplashScreen.hide();

      const loggerProps: ILoggerProps = {
        error,
        errorObject: newState,
        info,
        props: propsWithoutChildren(this.props),
      };

      let logMessage = 'ErrorBoundary caught an error';

      if (newState && newState.code) {
        logMessage = `${logMessage}. Code: ${newState.code}`;
      }

      if (newState && newState.title) {
        let titleText = newState.title;

        try {
          titleText = marketingCopy.get(titleText);
        } finally {
          logMessage = `${logMessage} ${titleText}`;
        }
      }

      logger.error(logMessage, loggerProps);
    }

    if (shouldSetState) {
      this.setState(state);
    }

    return state;
  }

  private defaultErrorObj: IExtendedError;

  /**
   * Render the component
   */
  public render() {
    let buttons;

    try {
      buttons = this.props.buttons
        ? this.props.buttons.map(({ action, text, ...button }) => ({
          action: action(this.state),
          text: text(this.state),
          ...button,
        }))
        : undefined;
    } catch (e) {
      const message = 'Could not get the error buttons for the ErrorBoundary';

      const loggerProps: {
        error: AppError;
        message: string;
        props?: { [key: string]: any };
        } = {
          error: e,
          message,
          props: undefined,
        };

      try {
        loggerProps.props = propsWithoutChildren(this.props);
        logger.error(message, loggerProps);
      } catch (error) {
        loggerProps.error = error;
        logger.error(
          'Encountered an error running propsWithoutChildren for logging an error within ErrorBoundary',
          loggerProps
        );
      }
    }

    return (
      <ErrorBoundary {...this.state} buttons={buttons}>
        {this.props.children}
      </ErrorBoundary>
    );
  }
}

export default ErrorBoundaryComponent;
