import * as React from 'react';
import Check from 'src/lib/assets/icons/Check';
import Clock from 'src/lib/assets/icons/Clock';
import EllipsisV from 'src/lib/assets/icons/EllipsisV';
import Trash from 'src/lib/assets/icons/Trash';
import Button from 'src/lib/components/Button';
import ReminderLink from 'src/lib/components/ReminderLink';
import Status from 'src/lib/components/ReminderStatus';
import SwipeAndClose from 'src/lib/components/SwipeAndClose';
import Text from 'src/lib/components/Text';
import getButtonType from 'src/lib/utils/getButtonType';
import * as Style from './Reminder.style';

export interface IContainerStateProps {
  text: string;
  saveStatus: 'saving' | 'saved' | 'error';
  isDone: boolean;
  isSnoozed: boolean;
}

export interface IContainerDispatchProps {
  onDelete: () => void;
  onSetDone: (val: boolean) => () => void;
  onSetDueDate: (time: number) => void;
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
  onSnooze: () => void;
  url?: string;
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IComponentProps,
    IContainerDispatchProps {}

/**
 * Display a list of reminders
 */
const Reminder = (props: IProps) => (
  <SwipeAndClose
    height={Style.REMINDER_HEIGHT}
    leftComponent={
      props.isDone ? (
        undefined
      ) : (
        <Style.SwipeContainerLeft>
          <Check
            backgroundColor={Style.SWIPE_BACKGROUND_COLOR_LEFT}
            size={Style.SWIPE_ICON_SIZE}
          />
        </Style.SwipeContainerLeft>
      )
    }
    rightComponent={
      <Style.SwipeContainerRight>
        <Clock
          backgroundColor={Style.SWIPE_BACKGROUND_COLOR_RIGHT}
          size={Style.SWIPE_ICON_SIZE}
        />
      </Style.SwipeContainerRight>
    }
    onSwipeLeftWaitForClose
    onSwipeLeftAnimateClose
    onSwipeLeft={props.onSetDone(!props.isDone)}
    onSwipeRight={props.onSnooze}
  >
    {({ closeAndRun }) => (
      <Style.Container
        key={props.id}
        testID="Reminder"
        hasBottomBorder={props.isFullWidth ? true : !props.isLast}
        hasTopBorder={props.isFullWidth && props.isFirst}
        hasUrl={!!props.url}
      >
        <Style.Content
          {...props.buttonEvents}
          hasBottomBorder={props.isFullWidth ? true : !props.isLast}
          hasTopBorder={props.isFullWidth && props.isFirst}
          hasUrl={!!props.url}
        >
          <Button
            analyticsAction="SHOW_EDIT_REMINDER"
            analyticsCategory="REMINDER"
            action={props.edit}
            testID="Reminder__Button"
            styles={{ flex: 1, flexDirection: 'row', width: '100%' }}
            disableHover
          >
            {() => (
              <Style.Inner>
                <Style.TextContainer>
                  <Text
                    testID="Reminder__Text"
                    text={{ _textFromConst: props.text }}
                    backgroundColor={Style.BACKGROUND_COLOR}
                    numberOfLines={1}
                  />
                </Style.TextContainer>
                <Style.Symbols>
                  {props.isSnoozed && (
                    <Style.Icon testID="Reminder__SnoozedIcon">
                      <Clock
                        _dangerouslySetColor={Style.SNOOZED_COLOR}
                        size={Style.ICON_SIZE}
                      />
                    </Style.Icon>
                  )}
                  {props.isDone && (
                    <Style.Icon testID="Reminder__DoneIcon">
                      <Check
                        _dangerouslySetColor={Style.CHECK_COLOR}
                        size={Style.ICON_SIZE}
                      />
                    </Style.Icon>
                  )}
                  <Status
                    status={props.saveStatus || 'saved'}
                    backgroundColor={Style.BACKGROUND_COLOR}
                  />
                </Style.Symbols>
              </Style.Inner>
            )}
          </Button>

          {props.isHovering && (
            <Style.EditMenu testID="Reminder__Hover" hasLink={!!props.url}>
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
                action={closeAndRun(props.onSetDone(!props.isDone))}
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
            </Style.EditMenu>
          )}
        </Style.Content>

        {!!props.url && (
          <ReminderLink
            url={props.url}
            backgroundColor={Style.BACKGROUND_COLOR}
            padding={Style.reminderSpacing}
          />
        )}
      </Style.Container>
    )}
  </SwipeAndClose>
);

export default Reminder;
