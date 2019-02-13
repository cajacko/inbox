import * as React from 'react';
import Reminder from 'src/lib/components/Reminder';
import { Container, Inner } from './ReminderList.style';

export interface IContainerStateProps {
  reminders: string[];
}

/**
 * Display a list of reminders
 */
const ReminderList = ({ reminders }: IContainerStateProps) => (
  <Container>
    <Inner>
      {reminders.map((reminder, i) => (
        <Reminder
          key={reminder}
          isLast={reminders.length - 1 === i}
          id={reminder}
        />
      ))}
    </Inner>
  </Container>
);

export default ReminderList;
