import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import AppError from 'src/lib/modules/AppError';
import SplashScreen from 'src/lib/modules/SplashScreen';
import { IExtendedError } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import appLoading from 'src/lib/utils/appLoading';
import errors from 'src/lib/utils/errors';

interface IProps {
  children: Children;
}

interface IState {
  loading: boolean;
  error?: IExtendedError;
}

/**
 * Handle whether to keep the splash screen/loading screen going on launch
 */
class AppLoadingComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    const loading = !appLoading.isResolved();
    const error = appLoading.isRejected() || undefined;

    this.state = {
      error: error && errors.getError(error),
      loading,
    };

    if (loading && !error) {
      appLoading
        .getPromise()
        .catch((e: AppError) => {
          this.setState({ loading: false, error: errors.getError(e) });
        })
        .then(() => {
          this.setState({ loading: false });
          SplashScreen.hide();
        });
    } else {
      SplashScreen.hide();
    }
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  public render() {
    // Don't need to show anything when loading, as the splash screen
    // should be showing. The only time it does show
    return (
      <ErrorBoundary error={this.state.error}>
        {this.state.loading ? null : this.props.children}
      </ErrorBoundary>
    );
  }
}

export default AppLoadingComponent;
