import selectors, { ISelector } from '../config/selectors';
import driver from '../utils/driver';
import getSelector from '../utils/getSelector';

class GoogleAuth {
  private submitSelector: ISelector = selectors.general.GoogleAuth.Submit;

  public typeCredentials() {
    throw new Error('type');
  }

  public submit() {
    return driver.press(getSelector(this.submitSelector));
  }
}

export default new GoogleAuth();
