import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class SnoozeModal {
  private snoozeModal = selectors.general.SnoozeModal;

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.snoozeModal));
  }
}

export default new SnoozeModal();
