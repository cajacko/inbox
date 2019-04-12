import * as React from 'react';
import ChevronLeft from 'src/lib/assets/icons/ChevronLeft';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import getButtonType from 'src/lib/utils/getButtonType';
import { ConfirmContainer, Error as ErrorContainer } from './Error.style';

export interface IProps {
  onBack: () => void;
}

/**
 * Render and control the snooze modals
 */
const Error = ({ onBack }: IProps) => {
  const testID = 'SnoozedModal';

  return (
    <ConfirmContainer testID={testID}>
      <Button
        analyticsAction="ERROR_BACK"
        analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
        action={onBack}
        styles={{ flexDirection: 'row', flex: 1 }}
        icon={ChevronLeft}
        text={{ _textFromConst: 'Back' }}
        iconLeft
        type={getButtonType('TRANSPARENT.PRIMARY')}
        leftAlign
        testID="Snooze__ErrorModalBack"
      />
      <ErrorContainer testID="Snooze__ErrorModal">
        <Text
          text={{
            _textFromConst:
              'Can not snooze to a past date, go back and pick future date',
          }}
          backgroundColor={BACKGROUND_COLORS.WHITE}
          type="body1"
        />
      </ErrorContainer>
    </ConfirmContainer>
  );
};

export default Error;
