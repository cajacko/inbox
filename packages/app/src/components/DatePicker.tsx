/* eslint react/no-multi-comp: 0 */
import * as React from 'react';
import AndroidDatePicker from 'src/components/AndroidDatePicker';
import IOSDatePicker from 'src/components/IOSDatePicker';
import CustomDate from 'src/lib/modules/CustomDate';
import { Children } from 'src/lib/types/libs';
import platform from 'src/utils/platform';

interface IProps {
  onChange: (date: CustomDate | null) => void;
  testID?: string;
  backgroundComponent: Children;
}

/**
 * Show the time picker
 */
const DatePicker = (props: IProps) =>
  (platform() === 'ios' ? (
    <IOSDatePicker isTime={false} {...props} />
  ) : (
    <AndroidDatePicker {...props} />
  ));

export default DatePicker;
