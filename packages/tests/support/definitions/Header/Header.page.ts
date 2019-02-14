import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Header {
  private loadingSelector: ISelector = selectors.general.Header.Loading;
  private errorSelector: ISelector = selectors.general.Header.Error;

  public async loadingVisible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.loadingSelector));
  }

  public async errorVisible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.errorSelector));
  }
}

export default new Header();
