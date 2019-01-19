import selectors from '../config/selectors';
import driver from '../utils/driver';
import { ICondition } from '../utils/ensureCondition';
import getSelector from '../utils/getSelector';

class SplashScreen {
  private splashScreen = selectors.general.SplashScreen;

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.splashScreen));
  }
}

export default new SplashScreen();
