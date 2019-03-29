import { Then, When } from 'cucumber';
import snoozeModal from './SnoozeModal.page';

Then('the snooze reminder modal {string} visible', condiiton =>
  snoozeModal.visible(condiiton));

Then('the {string} snooze suggestion is pressed', suggestion =>
  snoozeModal.pressSuggestion(suggestion));

Then('the snooze custom date scene {string} visible', condition =>
  snoozeModal.calendarVisible(condition));

When('the snooze scene custom date button is pressed', () =>
  snoozeModal.pressCustomDate());

When('the {string} snooze time suggestion is pressed', suggestion =>
  snoozeModal.pressTimeSuggestion(suggestion));

When('the snooze confirm change time button is pressed', () =>
  snoozeModal.pressChangeTime());

When('the snooze scene custom save button is pressed', () =>
  snoozeModal.pressSave());

Then(
  /the "(.+?)" snooze suggestions visiblity "(.+?)" (false|true)/,
  (suggestion, condition, value) =>
    snoozeModal.suggestionVisible(condition, suggestion, value)
);

Then(
  /the "(.+?)" snooze time suggestions visiblity "(.+?)" (false|true)/,
  (suggestion, condition, value) =>
    snoozeModal.suggestionVisible(condition, suggestion, value)
);

Then(/the snooze scene custom time "(.+?)" (.*)/, (condition, time) =>
  snoozeModal.customTimeIs(condition, time));

Then(/the snooze scene custom time label "(.+?)" (.*)/, (condition, label) =>
  snoozeModal.customTimeLabelIs(condition, label));
