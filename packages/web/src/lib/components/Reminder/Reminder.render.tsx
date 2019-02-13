import * as React from 'react';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLOR, Container } from './Reminder.style';

export interface IContainerStateProps {
  text: string;
  status: 'saving' | 'saved' | 'error';
}

export interface IPassedProps {
  id: string;
  isLast: boolean;
}

interface IProps extends IPassedProps, IContainerStateProps {}

/**
 * Display a list of reminders
 */
const Reminder = ({
  id, isLast, text, status,
}: IProps) => (
  <Container key={id} testID="Reminder" isLast={isLast}>
    <Text
      testID="Reminder__Text"
      text={{ _textFromConst: text }}
      backgroundColor={BACKGROUND_COLOR}
    />
    <Status status={status || 'saved'} backgroundColor={BACKGROUND_COLOR} />
  </Container>
);

export default Reminder;
