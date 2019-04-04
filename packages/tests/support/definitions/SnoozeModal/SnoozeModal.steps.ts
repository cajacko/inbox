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

When(
  /the (evening|morning|afternoon) snooze time suggestion is pressed/,
  suggestion => snoozeModal.pressTimeSuggestion(suggestion)
);

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

Then('the snooze reminder date suggestions {string} visible', condition =>
  snoozeModal.dateSuggestions(condition));

Then('the snooze error modal {string} visible', condition =>
  snoozeModal.errorModal(condition));

When('the snooze error back button is pressed', () =>
  snoozeModal.pressErrorBack());

Then('the snooze reminder confirm modal {string} visible', condition =>
  snoozeModal.confirmModal(condition));

Then(
  'the snooze scene custom time value {string} {string}',
  (condition, value) => snoozeModal.customTimeIs(condition, value)
);

Then(
  'the snooze scene custom date label {string} {string}',
  (condition, label) => snoozeModal.customDateLabelIs(condition, label)
);

Then('the time suggestions component {string} visible', condition =>
  snoozeModal.timeSuggestions(condition));
