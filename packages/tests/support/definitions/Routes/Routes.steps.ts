import { Then, When } from 'cucumber';
import driver from '../../utils/driver';
import ensureCondition, { ICondition } from '../../utils/ensureCondition';
import home from '../Home/Home.page';
import login from '../Login/Login.page';
import splashScreen from '../SplashScreen/SplashScreen.page';
import routes from './Routes.page';

Then(
  'the {string} home route {string} visible',
  (type: string, condition: ICondition) => {
    switch (type) {
      case 'logged in':
        return home.visible(condition);
      case 'logged out':
        return login.visible(condition);
      default:
        throw new Error();
    }
  }
);

When('we navigate to the {string} scene', (scene) => {
  const navigate = () => {
    switch (scene) {
      case 'done':
        return driver.navigate('/done');
      case 'home':
        return driver.navigate('/');
      case 'snoozed':
        return driver.navigate('/snoozed');
      case 'repeated':
        return driver.navigate('/repeated');
      default:
        throw new Error(`Did not recognise scene to navigate to ${scene}`);
    }
  };

  return navigate().then(() =>
    splashScreen.visible(ensureCondition('will not be')));
});

Then('the {string} route {string} visible', (route, condition) =>
  routes.routeVisible(condition, route));

Then('the route {string} {string}', (condition, route) =>
  routes.route(condition, route));
