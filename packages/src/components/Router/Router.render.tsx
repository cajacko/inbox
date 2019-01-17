import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import { IRoute } from 'src/lib/types/general';
import { Route, Switch } from 'src/packages/react-router';

interface IProps {
  routes: IRoute[];
}

/**
 * Render an individual route
 */
const route = (Component: IRoute['component']) => () => (
  <ErrorBoundary>
    <Component />
  </ErrorBoundary>
);

/**
 * Switch between a bunch of routes
 */
const Router = ({ routes }: IProps) => (
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

export default Router;
