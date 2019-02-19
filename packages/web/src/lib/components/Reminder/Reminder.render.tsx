import * as React from 'react';
import Check from 'src/lib/assets/icons/Check';
import EllipsisV from 'src/lib/assets/icons/EllipsisV';
import Trash from 'src/lib/assets/icons/Trash';
import Button from 'src/lib/components/Button';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  BACKGROUND_COLOR,
  CHECK_COLOR,
  Container,
  EditMenu,
  Icon,
  ICON_SIZE,
  Inner,
  Symbols,
} from './Reminder.style';

export interface IContainerStateProps {
  text: string;
  saveStatus: 'saving' | 'saved' | 'error';
  isDone: boolean;
}

export interface IContainerDispatchProps {
  onDelete: () => void;
  onSetDone: (val: boolean) => () => void;
}

export interface IPassedProps {
  id: string;
  isLast: boolean;
  isFullWidth: boolean;
  isFirst: boolean;
}

type Event = () => void;

export interface IComponentProps {
  edit: () => void;
  isHovering: boolean;
  buttonEvents: {
    onMouseEnter: Event;
    onMouseLeave: Event;
    onMouseMove: Event;
    onMouseOver: Event;
  };
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IComponentProps,
    IContainerDispatchProps {}

/**
 * Display a list of reminders
 */
const Reminder = ({
  id,
  isDone,
  isFullWidth,
  isFirst,
  isLast,
  text,
  saveStatus,
  edit,
  buttonEvents,
  isHovering,
  onDelete,
  onSetDone,
}: IProps) => (
  <Container
    key={id}
    testID="Reminder"
    hasBottomBorder={isFullWidth ? true : !isLast}
    hasTopBorder={isFullWidth && isFirst}
    {...buttonEvents}
  >
    <Button
      analyticsAction="SHOW_EDIT_REMINDER"
      analyticsCategory="REMINDER"
      action={edit}
      testID="Reminder__Button"
      styles={{ flex: 1, flexDirection: 'row' }}
      disableHover
    >
      {() => (
        <Inner>
          <Text
            testID="Reminder__Text"
            text={{ _textFromConst: text }}
            backgroundColor={BACKGROUND_COLOR}
          />
          <Symbols>
            {isDone && (
              <Icon>
                <Check _dangerouslySetColor={CHECK_COLOR} size={ICON_SIZE} />
              </Icon>
            )}
            <Status
              status={saveStatus || 'saved'}
              backgroundColor={BACKGROUND_COLOR}
            />
          </Symbols>
        </Inner>
      )}
    </Button>
    {isHovering && (
      <EditMenu testID="Reminder__Hover">
        <Button
          type={getButtonType('ICON.GREYED_OUT')}
          analyticsAction="DELETE_HOVER"
          analyticsCategory="REMINDER"
          action={onDelete}
          testID="Reminder__HoverDelete"
          icon={Trash}
        />
        <Button
          type={getButtonType('ICON.GREYED_OUT')}
          analyticsAction="DONE_HOVER"
          analyticsCategory="REMINDER"
          action={onSetDone(!isDone)}
          testID="Reminder__HoverDone"
          icon={Check}
        />
        <Button
          type={getButtonType('ICON.GREYED_OUT')}
          analyticsAction="SHOW_EDIT_REMINDER_HOVER"
          analyticsCategory="REMINDER"
          action={edit}
          testID="Reminder__HoverEdit"
          icon={EllipsisV}
        />
      </EditMenu>
    )}
  </Container>
);

export default Reminder;
