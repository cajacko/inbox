/* eslint react/no-multi-comp: 0 */
import * as React from 'react';
import { DatePickerAndroid } from 'react-native';
import CustomDate from 'src/lib/modules/CustomDate';
import { Children } from 'src/lib/types/libs';

interface IProps {
  onChange: (date: CustomDate | null) => void;
  testID?: string;
  backgroundComponent: Children;
}

/**
 * Show the android date picker
 */
class AndroidDatePicker extends React.Component<IProps> {
  /**
   * When the component mounts, show the date picker
   */
  public componentDidMount() {
    DatePickerAndroid.open({
      // The lib expects an actual date object, not our custom one
      // eslint-disable-next-line
      date: new Date(),
    }).then(({ action, ...vals }) => {
      if (action === DatePickerAndroid.dateSetAction) {
        if (!('year' in vals)) return;
        if (!('month' in vals)) return;
        if (!('day' in vals)) return;

        const { year, month, day } = vals;
        const date = new CustomDate();

        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);

        this.props.onChange(date);
      }
    });
  }

  /**
   * Render the background content
   */
  public render() {
    return this.props.backgroundComponent;
  }
}

export default AndroidDatePicker;
