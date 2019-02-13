import * as React from 'react';
import { Switch } from 'react-router';
import Route from 'src/lib/components/Route';
import { IRoute } from 'src/lib/types/general';
import testHook from 'src/utils/testHook';

interface IProps {
  routes: IRoute[];
  testHookKey?: string;
}

/**
 * Switch between a bunch of routes
 */
const Router = ({ routes, testHookKey }: IProps) => {
  if (testHookKey) testHook(testHookKey, undefined);

  return (
    <Switch>
      {routes.map(props => (
        <Route key={props.path || ''} {...props} />
      ))}
    </Switch>
  );
};

export default Router;
