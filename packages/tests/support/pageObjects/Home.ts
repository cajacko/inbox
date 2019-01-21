import selectors, { ISelector } from '../config/selectors';
import driver from '../utils/driver';
import { ICondition } from '../utils/ensureCondition';
import getSelector from '../utils/getSelector';

class Home {
  private containerSelector: ISelector = selectors.general.Home.Container;

  public visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.containerSelector));
  }
}

export default new Home();
