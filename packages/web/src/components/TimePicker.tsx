import * as React from 'react';
import DatePicker from 'src/components/DatePicker';

interface IProps {
  onChange: () => void;
  testID?: string;
}

/**
 * Show the time picker
 */
const TimePicker = ({ onChange, testID }: IProps) => (
  <DatePicker onChange={onChange} showTimeOnly testID={testID} />
);

export default TimePicker;
