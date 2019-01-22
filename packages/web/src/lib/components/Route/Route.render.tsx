import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import { IRoute } from 'src/lib/types/general';
import errors from 'src/lib/utils/errors';
import { Route as RRRoute } from 'src/packages/react-router';

interface IProps {
  component: IRoute['component'];
  path?: string;
  exact?: boolean;
}

/**
 * Content for the route
 */
const component = (Component: IRoute['component']) => () => (
  <ErrorBoundary defaultError={errors.getError('100-008')}>
    <Component />
  </ErrorBoundary>
);

/**
 * A generic route component
 */
const Route = ({ component: Component, path, exact }: IProps) => (
  <RRRoute path={path} component={component(Component)} exact={exact} />
);

export default Route;
