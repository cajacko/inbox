import * as React from 'react';
import Button from 'src/lib/components/Button';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLOR, Container, Inner } from './Reminder.style';

export interface IContainerStateProps {
  text: string;
  status: 'saving' | 'saved' | 'error';
}

export interface IPassedProps {
  id: string;
  isLast: boolean;
}

export interface IComponentProps {
  add: () => void;
}

interface IProps extends IPassedProps, IContainerStateProps, IComponentProps {}

/**
 * Display a list of reminders
 */
const Reminder = ({
  id, isLast, text, status, add,
}: IProps) => (
  <Container key={id} testID="Reminder" isLast={isLast}>
    <Button
      analyticsAction="SHOW_EDIT_REMINDER"
      analyticsCategory="REMINDER"
      action={add}
      testID="Reminder__Button"
      styles={{ flex: 1, flexDirection: 'row' }}
    >
      {() => (
        <Inner>
          <Text
            testID="Reminder__Text"
            text={{ _textFromConst: text }}
            backgroundColor={BACKGROUND_COLOR}
          />
          <Status
            status={status || 'saved'}
            backgroundColor={BACKGROUND_COLOR}
          />
        </Inner>
      )}
    </Button>
  </Container>
);

export default Reminder;
