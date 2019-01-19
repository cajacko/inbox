import driver from '../utils/driver';
import { ICondition } from '../utils/ensureCondition';
import getSelector from '../utils/getSelector';

class SplashScreen {
  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector('splashScreen'));
  }
}

export default new SplashScreen();
