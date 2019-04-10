/* eslint react/no-multi-comp: 0 */
import * as React from 'react';
import { DatePickerIOS } from 'react-native';
import View from 'src/components/View';
import Button from 'src/lib/components/Button';
import CustomDate from 'src/lib/modules/CustomDate';
import { Children } from 'src/lib/types/libs';
import getButtonType from 'src/lib/utils/getButtonType';
import styled from 'styled-components';

interface IProps {
  onChange: (date: CustomDate | null) => void;
  testID?: string;
  backgroundComponent: Children;
}

interface IIosProps extends IProps {
  isTime: boolean;
}

interface IIosState {
  date: CustomDate;
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
class IOSDatePicker extends React.Component<IIosProps, IIosState> {
  /**
   * Set the initial state and bind the methods
   */
  constructor(props: IIosProps) {
    super(props);

    this.state = {
      date: new CustomDate(),
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * When the date is submitted, call the callback
   */
  private onChange() {
    this.props.onChange(this.state.date);
  }

  /**
   * When the date changes, update the state
   */
  private onDateChange(date: Date) {
    this.setState({ date: new CustomDate(date.getTime()) });
  }

  /**
   * Render the ios date picker
   */
  public render() {
    return (
      <IOSContainer>
        <DatePickerIOS
          // DatePickerIOS expects an actual date
          // eslint-disable-next-line
          date={this.state.date.toDate()}
          onDateChange={this.onDateChange}
          mode={this.props.isTime ? 'time' : 'date'}
        />
        <SetSpacing>
          <Button
            action={this.onChange}
            text="DatePicker.Set"
            analyticsAction="SET_DATE"
            analyticsCategory="DATE_PICKER_IOS"
            type={getButtonType('CONTAINED.PRIMARY')}
          />
        </SetSpacing>
      </IOSContainer>
    );
  }
}

export default IOSDatePicker;
