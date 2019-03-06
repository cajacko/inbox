import * as React from 'react';
import { TimePickerAndroid } from 'react-native';
import { IOSDatePicker } from 'src/components/DatePicker';
import { Children } from 'src/lib/types/libs';
import platform from 'src/utils/platform';

interface IProps {
  onChange: () => void;
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
    const date = new Date();

    TimePickerAndroid.open({
      hour: date.getHours(),
      is24Hour: true,
      minute: date.getMinutes(),
    }).then(() => this.props.onChange());
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
