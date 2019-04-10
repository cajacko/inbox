import * as React from 'react';
import { TimePickerAndroid } from 'react-native';
import IOSDatePicker from 'src/components/IOSDatePicker';
import CustomDate from 'src/lib/modules/CustomDate';
import { Children } from 'src/lib/types/libs';
import platform from 'src/utils/platform';

interface IProps {
  onChange: (date: CustomDate) => void;
  testID?: string;
  backgroundComponent: Children;
}

/**
 * Show the android date picker
 */
class AndroidTimePicker extends React.Component<IProps> {
  /**
   * When the component mounts, show the date picker
   */
  public componentDidMount() {
    const startDate = new CustomDate();

    TimePickerAndroid.open({
      hour: startDate.getHours(),
      is24Hour: true,
      minute: startDate.getMinutes(),
    }).then(({ action, ...vals }) => {
      if (action === TimePickerAndroid.dismissedAction) return;
      if (!('hour' in vals) && !('minute' in vals)) return;

      const { hour, minute } = vals;
      const date = new CustomDate();

      date.setHours(hour);
      date.setMinutes(minute);

      this.props.onChange(date);
    });
  }

  /**
   * Render the background content
   */
  public render() {
    return this.props.backgroundComponent;
  }
}

/**
 * Show the time picker
 */
const TimePicker = (props: IProps) =>
  (platform() === 'ios' ? (
    <IOSDatePicker isTime {...props} />
  ) : (
    <AndroidTimePicker {...props} />
  ));

export default TimePicker;
