import * as React from 'react';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import {
  BACKGROUND_COLOR,
  Container,
  Inner,
  Reminder,
} from './ReminderList.style';

interface IReminder {
  id: string;
  text: string;
  status: 'saving' | 'saved' | 'error';
}

export interface IContainerStateProps {
  reminders: IReminder[];
}

/**
 * Display a list of reminders
 */
const ReminderList = ({ reminders }: IContainerStateProps) => (
  <Container>
    <Inner>
      {reminders.map((reminder, i) => (
        <Reminder
          key={reminder.id}
          testID="Reminder"
          isLast={reminders.length - 1 === i}
        >
          <Text
            testID="Reminder__Text"
            text={{ _textFromConst: reminder.text }}
            backgroundColor={BACKGROUND_COLOR}
          />
          <Status
            status={reminder.status || 'saved'}
            backgroundColor={BACKGROUND_COLOR}
          />
        </Reminder>
      ))}
    </Inner>
  </Container>
);

export default ReminderList;
