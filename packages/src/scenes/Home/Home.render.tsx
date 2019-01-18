import * as React from 'react';
import ErrorBoundary from 'src/lib/components/ErrorBoundary';
import withRouter from 'src/lib/HOCs/withRouter';
import errors from 'src/lib/utils/errors';

/**
 * 404 scene for unknown routes
 */
const Home = () => (
  <ErrorBoundary
    error={errors.getError('100-001')}
    defaultError={errors.getError('100-001')}
  />
);

export default withRouter(Home);
