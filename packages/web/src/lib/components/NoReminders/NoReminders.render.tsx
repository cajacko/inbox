import * as React from 'react';
import GrinBeam from 'src/lib/assets/icons/GrinBeam';
import Text from 'src/lib/components/Text';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import { Container, Heading, Icon, ICON_SIZE } from './NoReminders.style';

interface IProps {
  backgroundColor: BackgroundColorVal;
}

/**
 * Fun graphic to show when there are no reminders
 */
const NoReminders = ({ backgroundColor }: IProps) => (
  <Container testID="NoReminders">
    <Icon>
      <GrinBeam size={ICON_SIZE} backgroundColor={backgroundColor} />
    </Icon>
    <Heading>
      <Text
        type="h5"
        center
        text="ReminderList.NoReminders.Heading"
        backgroundColor={backgroundColor}
      />
    </Heading>
    <Text
      center
      text="ReminderList.NoReminders.SubHeading"
      backgroundColor={backgroundColor}
    />
  </Container>
);

export default NoReminders;
