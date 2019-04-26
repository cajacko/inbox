import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class RepeatModal {
  private selectors = {
    daily: selectors.general.RepeatModal.Suggestions.Daily,
    repeatModal: selectors.general.RepeatModal,
    repeatModalSuggestions: selectors.general.RepeatModal.Suggestions,
  };

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.selectors.repeatModal));
  }

  public async pressSuggestions() {
    return driver.press(getSelector(this.selectors.repeatModalSuggestions));
  }

  public async pressRepeatSuggestion(suggestion: string) {
    let selector: ISelector;

    switch (suggestion) {
      case 'daily':
        selector = this.selectors.daily;
        break;
      default:
        throw new Error(`Could not get defined suggestion: "${suggestion}"`);
    }

    return driver.press(getSelector(selector));
  }
}

export default new RepeatModal();
