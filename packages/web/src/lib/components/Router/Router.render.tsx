import * as React from 'react';
import { IRoute } from 'src/lib/types/general';
import { Switch } from 'src/packages/react-router';
import testHook from 'src/utils/testHook';
import Route from '../Route';

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