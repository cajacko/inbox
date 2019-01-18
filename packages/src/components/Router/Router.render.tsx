import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import { IRoute } from 'src/lib/types/general';
import errors from 'src/lib/utils/errors';
import { Route, Switch } from 'src/packages/react-router';
import testHook from 'src/utils/testHook';

interface IProps {
  routes: IRoute[];
  testHookKey?: string;
}

/**
 * Render an individual route
 */
const route = (Component: IRoute['component']) => () => (
  <ErrorBoundary defaultError={errors.getError('100-008')}>
    <Component />
  </ErrorBoundary>
);

/**
 * Switch between a bunch of routes
 */
const Router = ({ routes, testHookKey }: IProps) => {
  if (testHookKey) testHook(testHookKey, undefined);

  return (
    <Switch>
      {routes.map(({ path, component, exact }) => (
        <Route
          key={path || ''}
          path={path}
          component={route(component)}
          exact={exact}
        />
      ))}
    </Switch>
  );
};

export default Router;
