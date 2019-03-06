import { When } from 'cucumber';
import datePicker from './DatePicker.page';

When('day {string} in the date picker is pressed', day =>
  datePicker.pressDay(parseInt(day, 10)));
