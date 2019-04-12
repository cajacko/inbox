import * as React from 'react';
import Check from 'src/lib/assets/icons/Check';
import Clock from 'src/lib/assets/icons/Clock';
import EllipsisV from 'src/lib/assets/icons/EllipsisV';
import Redo from 'src/lib/assets/icons/Redo';
import Trash from 'src/lib/assets/icons/Trash';
import Button from 'src/lib/components/Button';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import getButtonType from 'src/lib/utils/getButtonType';
import { Container } from './ReminderMenu.style';

interface IProps {
  edit: () => void;
  onSnooze: () => void;
  onRepeat: () => void;
  url?: string;
  onDelete: () => void;
  onSetDone: () => void;
  reminderSpacing: number;
  backgroundColor: BackgroundColorVal;
}

/**
 * Display the reminder menu that shows on hover
 */
const ReminderMenu = (props: IProps) => (
  <Container
    testID="Reminder__Hover"
    hasLink={!!props.url}
    reminderSpacing={props.reminderSpacing}
    backgroundColor={props.backgroundColor}
  >
    <Button
      type={getButtonType('ICON.GREYED_OUT')}
      analyticsAction="REPEAT_HOVER"
      analyticsCategory="REMINDER"
      action={props.onRepeat}
      testID="Reminder__HoverRepeat"
      icon={Redo}
    />
    <Button
      type={getButtonType('ICON.GREYED_OUT')}
      analyticsAction="SNOOZE_HOVER"
      analyticsCategory="REMINDER"
      action={props.onSnooze}
      testID="Reminder__HoverSnooze"
      icon={Clock}
    />
    <Button
      type={getButtonType('ICON.GREYED_OUT')}
      analyticsAction="DELETE_HOVER"
      analyticsCategory="REMINDER"
      action={props.onDelete}
      testID="Reminder__HoverDelete"
      icon={Trash}
    />
    <Button
      type={getButtonType('ICON.GREYED_OUT')}
      analyticsAction="DONE_HOVER"
      analyticsCategory="REMINDER"
      action={props.onSetDone}
      testID="Reminder__HoverDone"
      icon={Check}
    />
    <Button
      type={getButtonType('ICON.GREYED_OUT')}
      analyticsAction="SHOW_EDIT_REMINDER_HOVER"
      analyticsCategory="REMINDER"
      action={props.edit}
      testID="Reminder__HoverEdit"
      icon={EllipsisV}
    />
  </Container>
);

export default ReminderMenu;
