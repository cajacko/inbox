import * as H from 'history';
import * as React from 'react';
import isEqual from 'src/lib/utils/conditionals/isEqual';
import { withRouter as RRWithRouter } from 'src/packages/react-router';

/**
 * Don't push if same route
 */
const passRouterProps = (location: H.Location, history: H.History) => {
  /**
   * Custom push function
   */
  const push = (preventPush: boolean) => (
    newPathname: string,
    state: { [key: string]: any },
    forceUpdate: boolean
  ) => {
    if (!forceUpdate) {
      if (
        isEqual(newPathname, location.pathname) &&
        isEqual(state, location.state)
      ) {
        return false;
      }
    }

    if (!preventPush) {
      history.push(newPathname, state);
    }

    return true;
  };

  return {
    history: {
      ...history,
      push: push(false),
      wouldPushUpdate: push(true),
    },
    location,
  };
};

/**
 * Wrap a component with react router
 */
const withRouter = (Component: React.ComponentType<any>) =>
  RRWithRouter(({ location, history, ...props }) => (
    <Component {...passRouterProps(location, history)} {...props} />
  ));

export default withRouter;
