import { When } from 'cucumber';
import datePicker from './DatePicker.page';

When('day {string} in the date picker is pressed', day =>
  datePicker.pressDay(parseInt(day, 10)));

When(/(today|tomorrow) in the date picker is pressed/, day =>
  datePicker.pressDay(day === 'tomorrow' ? 5 : 4));

When(/the snooze time is set to (.*)/, time => datePicker.setTime(time));
