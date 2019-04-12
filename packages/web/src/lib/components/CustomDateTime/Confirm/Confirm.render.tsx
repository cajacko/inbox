import * as React from 'react';
import Button from 'src/lib/components/Button';
import DropDown from 'src/lib/components/DropDown';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  ConfirmContainer,
  ConfirmHeader,
  ConfirmSaveButton,
} from './Confirm.style';

export interface IProps {
  onSelectDateAndTime: () => void;
  customDate: string;
  onSelectTime: () => void;
  customTimeLabel: string;
  customTime: string;
  onSave: () => void;
}

/**
 * Render and control the snooze modals
 */
const Confirm = ({
  onSelectDateAndTime,
  customDate,
  onSelectTime,
  customTimeLabel,
  customTime,
  onSave,
}: IProps) => {
  const testID = 'SnoozedModal';

  return (
    <ConfirmContainer testID={testID}>
      <ConfirmHeader testID="SnoozeConfirm__ConfirmModal">
        <Text
          text={{ _textFromConst: 'Select date and time' }}
          backgroundColor={BACKGROUND_COLORS.WHITE}
          type="h6"
        />
      </ConfirmHeader>

      <DropDown
        text={{ _textFromConst: customDate }}
        action={onSelectDateAndTime}
        analyticsAction="OPEN_DATE"
        analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
        buttonTestID="Suggestion--SelectDateTime"
        textTestID="SnoozeConfirm__CustomDateLabel"
      />

      <DropDown
        text={customTimeLabel}
        rightText={{ _textFromConst: customTime }}
        action={onSelectTime}
        analyticsAction="OPEN_TIME"
        analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
        buttonTestID="SnoozeConfirm__Time"
        textTestID="SnoozeConfirm__TimeLabel"
        rightTextTestID="SnoozeConfirm__TimeValue"
      />

      <ConfirmSaveButton>
        <Button
          text={{ _textFromConst: 'Save' }}
          analyticsAction="SAVE"
          analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
          type={getButtonType('TRANSPARENT.PRIMARY')}
          testID="SnoozeConfirm__Save"
          action={onSave}
        />
      </ConfirmSaveButton>
    </ConfirmContainer>
  );
};

export default Confirm;
