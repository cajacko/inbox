import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class SnoozeModal {
  private snoozeModal = selectors.general.SnoozeModal;
  private laterTodaySelector =
    selectors.general.SnoozeModal.Suggestions.LaterToday;

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.snoozeModal));
  }

  public async pressSuggestion(suggestion: string) {
    const getSuggestion = () => {
      switch (suggestion) {
        case 'later today':
          return this.laterTodaySelector;
        default:
          throw new Error(`No suggestion for ${suggestion}`);
      }
    };

    return driver.press(getSelector(getSuggestion()));
  }
}

export default new SnoozeModal();
