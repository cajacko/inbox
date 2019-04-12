import * as React from 'react';
import DatePicker from 'src/components/DatePicker';
import TimePicker from 'src/components/TimePicker';
import Confirm from 'src/lib/components/CustomDateTime/Confirm';
import Error from 'src/lib/components/CustomDateTime/Error';
import TimeSuggestions from 'src/lib/components/CustomDateTime/TimeSuggestions';
import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';

export interface ISuggestedTimes {
  label: string;
  time?: string;
  onChangeTime: () => void;
  testID: string;
}

export interface IProps {
  type: 'CALENDAR' | 'TIME' | 'CONFIRM' | 'TIME_SUGGESTIONS' | 'ERROR';
  onSelectDateAndTime: () => void;
  onChangeDate: (date: CustomDate) => void;
  customDate: string;
  onSelectTime: () => void;
  customTimeLabel: string;
  customTime: string;
  suggestedTimes: ISuggestedTimes[];
  onChangeTime: (date: CustomDate | null) => void;
  onSave: () => void;
  customDateObject: CustomDate;
  onBack: () => void;
  testID?: string;
}

/**
 * Render and control the custom date time modals
 */
const Container = ({
  customDateObject,
  type,
  onSelectDateAndTime,
  onChangeDate,
  customDate,
  onSelectTime,
  customTimeLabel,
  customTime,
  suggestedTimes,
  onChangeTime,
  onSave,
  onBack,
}: IProps) => {
  const confirm = (
    <Confirm
      onSelectDateAndTime={onSelectDateAndTime}
      customDate={customDate}
      onSelectTime={onSelectTime}
      customTimeLabel={customTimeLabel}
      customTime={customTime}
      onSave={onSave}
    />
  );

  switch (type) {
    case 'ERROR':
      return <Error onBack={onBack} />;

    case 'TIME':
      return (
        <TimePicker
          onChange={onChangeTime}
          testID="Snooze--TimePicker"
          backgroundComponent={confirm}
        />
      );

    case 'CALENDAR':
      return (
        <DatePicker
          date={customDateObject}
          onChange={onChangeDate}
          testID="Snooze--DatePicker"
          backgroundComponent={confirm}
        />
      );

    case 'CONFIRM':
      return confirm;

    case 'TIME_SUGGESTIONS':
      return <TimeSuggestions suggestedTimes={suggestedTimes} />;

    default:
      throw new AppError(
        `Invalid type given to CustomDateTime: ${type}`,
        '100-021'
      );
  }
};

export default Container;
