import * as React from 'react';
import NoReminders from 'src/lib/components/NoReminders';
import Reminder from 'src/lib/components/Reminder';
import { BACKGROUND_COLOR, Container, Inner } from './ReminderList.style';

export interface IContainerStateProps {
  reminders: string[];
}

/**
 * Display a list of reminders
 */
const ReminderList = ({ reminders }: IContainerStateProps) =>
  (reminders.length === 0 ? (
    <NoReminders backgroundColor={BACKGROUND_COLOR} />
  ) : (
    <Container testID="ReminderList">
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
  ));

export default ReminderList;
