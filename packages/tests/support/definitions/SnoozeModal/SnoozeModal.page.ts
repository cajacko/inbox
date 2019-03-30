import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import ensureCondition, { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class SnoozeModal {
  private snoozeModal = selectors.general.SnoozeModal;

  private laterTodaySelector =
    selectors.general.SnoozeModal.Suggestions.LaterToday;
  private laterThisWeekSelector =
    selectors.general.SnoozeModal.Suggestions.LaterThisWeek;
  private nextWeekSelector = selectors.general.SnoozeModal.Suggestions.NextWeek;
  private nextWeekendSelector =
    selectors.general.SnoozeModal.Suggestions.NextWeekend;
  private thisWeekendSelector =
    selectors.general.SnoozeModal.Suggestions.ThisWeekend;
  private tomorrowSelector = selectors.general.SnoozeModal.Suggestions.Tomorrow;
  private customDateTimeSelector =
    selectors.general.SnoozeModal.Suggestions.Custom;
  private snoozeCalendar = selectors.general.SnoozeModal.Calendar;
  private eveningTimeSelector =
    selectors.general.SnoozeModal.Suggestions.Time.Evening;
  private morningTimeSelector =
    selectors.general.SnoozeModal.Suggestions.Time.Morning;
  private afternoonTimeSelector =
    selectors.general.SnoozeModal.Suggestions.Time.Afternoon;
  private changeTimeSelector = selectors.general.SnoozeModal.ChangeTime;
  private customisedTimeSelector =
    selectors.general.SnoozeModal.Suggestions.Time.Customised;
  private saveSelector = selectors.general.SnoozeModal.Save;
  private morningSelector = selectors.general.SnoozeModal.Suggestions.Morning;
  private afternoonSelector =
    selectors.general.SnoozeModal.Suggestions.Afternoon;
  private eveningSelector = selectors.general.SnoozeModal.Suggestions.Evening;
  private customTimeSelector = selectors.general.SnoozeModal.CustomTime;
  private customTimeLabelSelector =
    selectors.general.SnoozeModal.CustomTimeLabel;
  private dateSuggestionsSelector =
    selectors.general.SnoozeModal.DateSuggestions;
  private errorModalSector = selectors.general.SnoozeModal.ErrorModal;
  private errorModalBackSelector = selectors.general.SnoozeModal.ErrorModalBack;
  private confirmModalSelector = selectors.general.SnoozeModal.ConfirmModal;

  public async visible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.snoozeModal));
  }

  private getSuggestion(suggestion: string) {
    switch (suggestion) {
      case 'later today':
        return this.laterTodaySelector;
      case 'later this week':
        return this.laterThisWeekSelector;
      case 'next week':
        return this.nextWeekSelector;
      case 'next weekend':
        return this.nextWeekendSelector;
      case 'this weekend':
        return this.thisWeekendSelector;
      case 'tomorrow':
        return this.tomorrowSelector;
      case 'morning':
        return this.morningSelector;
      case 'afternoon':
        return this.afternoonSelector;
      case 'evening':
        return this.eveningSelector;
      default:
        throw new Error(`No suggestion for ${suggestion}`);
    }
  }

  public async pressSuggestion(suggestion: string) {
    return driver.press(getSelector(this.getSuggestion(suggestion)));
  }

  public async calendarVisible(conditional: ICondition) {
    return driver.visible(conditional, getSelector(this.snoozeCalendar));
  }

  public async pressCustomDate() {
    return driver.press(getSelector(this.customDateTimeSelector));
  }

  public async pressTimeSuggestion(suggestion: string) {
    const getSuggestion = () => {
      switch (suggestion) {
        case 'evening':
          return this.eveningTimeSelector;
        case 'morning':
          return this.morningTimeSelector;
        case 'afternoon':
          return this.afternoonTimeSelector;
        case 'customised':
          return this.customisedTimeSelector;
        default:
          throw new Error(`No time suggestion for ${suggestion}`);
      }
    };

    return driver.press(getSelector(getSuggestion()));
  }

  public async pressChangeTime() {
    return driver.press(getSelector(this.changeTimeSelector));
  }

  public async pressSave() {
    return driver.press(getSelector(this.saveSelector));
  }

  public async suggestionVisible(
    condition: string,
    suggestion: string,
    value: 'true' | 'false'
  ) {
    const finalCondition = ensureCondition(condition);

    if (value === 'false') {
      finalCondition.positive = !finalCondition.positive;
    }

    return driver.visible(
      finalCondition,
      getSelector(this.getSuggestion(suggestion))
    );
  }

  public async customTimeIs(condition: ICondition, time: string) {
    return driver.text(condition, getSelector(this.customTimeSelector), time);
  }

  public async customTimeLabelIs(condition: ICondition, label: string) {
    return driver.text(
      condition,
      getSelector(this.customTimeLabelSelector),
      label
    );
  }

  public async dateSuggestions(condition: ICondition) {
    return driver.visible(condition, getSelector(this.dateSuggestionsSelector));
  }

  public async errorModal(condition: ICondition) {
    return driver.visible(condition, getSelector(this.errorModalSector));
  }

  public async pressErrorBack() {
    return driver.press(getSelector(this.errorModalBackSelector));
  }

  public async confirmModal(condition: ICondition) {
    return driver.visible(condition, getSelector(this.confirmModalSelector));
  }
}

export default new SnoozeModal();
