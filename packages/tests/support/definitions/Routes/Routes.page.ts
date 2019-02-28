import { parse } from 'url';
import selectors, { ISelector } from '../../config/selectors';
import conditional from '../../utils/conditional';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Routes {
  private doneSceneSelector: ISelector = selectors.general.Done;
  private homeSceneSelector: ISelector = selectors.general.Home.Container;

  public async routeVisible(condition: ICondition, route: string) {
    const getRoute = () => {
      switch (route) {
        case 'home':
          return getSelector(this.homeSceneSelector);
        case 'done':
          return getSelector(this.doneSceneSelector);
        default:
          throw new Error(`Unknown route given ${route}`);
      }
    };

    return driver.visible(condition, getRoute());
  }

  public async route(condition: ICondition, route: string) {
    let lastRoute: string;

    await conditional(
      condition,
      async () => {
        const actualRoute = await driver.getRoute();

        const { pathname } = parse(actualRoute);

        if (!pathname) return false;

        lastRoute = pathname;

        return lastRoute === route;
      },
      () => ({
        negative: `Expected route not to be "${route}" but was`,
        positive: `Expected route to be "${route}" received ${lastRoute}"`,
        waitNegative: `Expected route not to become "${route}" but didn't`,
        waitPositive: `Expected route to become "${route}" last received ${lastRoute}"`,
      })
    );
  }
}

export default new Routes();
