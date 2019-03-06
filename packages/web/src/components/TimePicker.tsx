import * as React from 'react';
import DatePicker from 'src/components/DatePicker';

interface IProps {
  onChange: () => void;
}

/**
 * Show the time picker
 */
const TimePicker = ({ onChange }: IProps) => (
  <DatePicker onChange={onChange} showTimeOnly />
);

export default TimePicker;
