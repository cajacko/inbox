import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import AppError from 'src/lib/modules/AppError';
import SplashScreen from 'src/lib/modules/SplashScreen';
import { IExtendedError } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import appLoading from 'src/lib/utils/appLoading';
import errors from 'src/lib/utils/errors';
import testHook from 'src/utils/testHook';

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
      const { duration, delay } = testHook('splashScreen', {
        delay: () => Promise.resolve(),
        duration: 3000,
      });

      const timeout = setTimeout(() => {
        if (this.state.loading) {
          this.setState({ loading: false, error: errors.getError('100-009') });
          SplashScreen.hide();
        }
      }, duration);

      appLoading
        .getPromise()
        .then(delay)
        .then(() => undefined)
        .catch((e: AppError) => errors.getError(e))
        .then((e) => {
          clearTimeout(timeout);
          this.setState({ loading: false, error: e });
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
      <ErrorBoundary
        error={this.state.error}
        defaultError={errors.getError('100-003')}
      >
        {this.state.loading ? null : this.props.children}
      </ErrorBoundary>
    );
  }
}

export default AppLoadingComponent;
