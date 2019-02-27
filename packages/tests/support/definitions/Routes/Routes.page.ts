import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Routes {
  private doneSceneSelector: ISelector = selectors.general.Done;
  private homeSceneSelector: ISelector = selectors.general.Home;

  public routeVisible(condition: ICondition, route: string) {
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

    driver.visible(condition, getRoute());
  }
}

export default new Routes();
