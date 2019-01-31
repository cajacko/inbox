import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';

class Alert {
  public async visible(conditional: ICondition) {
    return driver.alertVisible(conditional);
  }

  public async textIs(text: string) {
    return driver.alertTextIs(text);
  }

  public async pressButton(button: number) {
    return driver.pressAlertButton(button);
  }
}

export default new Alert();
