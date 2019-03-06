import * as React from 'react';
import DatePicker from 'src/components/DatePicker';
import { Children } from 'src/lib/types/libs';

interface IProps {
  onChange: () => void;
  testID?: string;
  backgroundComponent: Children;
}

/**
 * Show the time picker
 */
const TimePicker = ({ onChange, testID, backgroundComponent }: IProps) => (
  <DatePicker
    onChange={onChange}
    showTimeOnly
    testID={testID}
    backgroundComponent={backgroundComponent}
  />
);

export default TimePicker;
