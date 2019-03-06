import * as React from 'react';
import { DatePickerAndroid, DatePickerIOS } from 'react-native';
import View from 'src/components/View';
import Button from 'src/lib/components/Button';
import { Children } from 'src/lib/types/libs';
import getButtonType from 'src/lib/utils/getButtonType';
import platform from 'src/utils/platform';
import styled from 'styled-components';

interface IProps {
  onChange: () => void;
  testID?: string;
  backgroundComponent: Children;
}

interface IIosProps extends IProps {
  isTime: boolean;
}

const IOSContainer = styled(View)`
  width: 400;
`;

const SetSpacing = styled(View)`
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

/**
 * The ios date picker
 */
export const IOSDatePicker = ({ onChange, isTime }: IIosProps) => (
  <IOSContainer>
    <DatePickerIOS
      date={new Date()}
      onDateChange={() => {}}
      mode={isTime ? 'time' : 'date'}
    />
    <SetSpacing>
      <Button
        action={onChange}
        text="DatePicker.Set"
        analyticsAction="SET_DATE"
        analyticsCategory="DATE_PICKER_IOS"
        type={getButtonType('CONTAINED.PRIMARY')}
      />
    </SetSpacing>
  </IOSContainer>
);

/**
 * Show the android date picker
 */
class AndroidDatePicker extends React.Component<IProps> {
  /**
   * When the component mounts, show the date picker
   */
  public componentDidMount() {
    DatePickerAndroid.open({
      date: new Date(),
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
const DatePicker = (props: IProps) =>
  (platform() === 'ios' ? (
    <IOSDatePicker isTime={false} {...props} />
  ) : (
    <AndroidDatePicker {...props} />
  ));

export default DatePicker;
