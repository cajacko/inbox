import * as React from 'react';
import { SwipeRow } from 'src/components';
import { Ref } from 'src/components/SwipeRow';
import Check from 'src/lib/assets/icons/Check';
import EllipsisV from 'src/lib/assets/icons/EllipsisV';
import Trash from 'src/lib/assets/icons/Trash';
import Button from 'src/lib/components/Button';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import getButtonType from 'src/lib/utils/getButtonType';
import Animated from 'src/packages/animated';
import * as Style from './Reminder.style';

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
  onRowOpen: () => void;
  onRowDidClose: () => void;
  setSwipeRef: (ref: Ref) => void;
  showSwiper: boolean;
  height: Animated.AnimatedInterpolation;
}

interface IProps
  extends IPassedProps,
    IContainerStateProps,
    IComponentProps,
    IContainerDispatchProps {}

/**
 * Display a list of reminders
 */
const Reminder = (props: IProps) => {
  const Wrapper = props.showSwiper ? SwipeRow : Style.Wrapper;
  const wrapperProps = props.showSwiper ? {
    disableLeftSwipe: true,
    disableRightSwipe: props.isDone,
    hidden: (
      <Style.SwipeContainer>
        <Check
          backgroundColor={Style.SWIPE_BACKGROUND_COLOR}
          size={Style.SWIPE_ICON_SIZE}
        />
      </Style.SwipeContainer>
    ),
    leftOpenValue: 150,
    onRowDidClose: props.onRowDidClose,
    onRowOpen: props.onRowOpen,
    ref: props.setSwipeRef,
  } : { style: { height: props.height } };

  return (
    // @ts-ignore
    <Wrapper {...wrapperProps}>
      <Style.Container
        key={props.id}
        testID="Reminder"
        hasBottomBorder={props.isFullWidth ? true : !props.isLast}
        hasTopBorder={props.isFullWidth && props.isFirst}
        {...props.buttonEvents}
      >
        <Button
          analyticsAction="SHOW_EDIT_REMINDER"
          analyticsCategory="REMINDER"
          action={props.edit}
          testID="Reminder__Button"
          styles={{ flex: 1, flexDirection: 'row' }}
          disableHover
        >
          {() => (
            <Style.Inner>
              <Text
                testID="Reminder__Text"
                text={{ _textFromConst: props.text }}
                backgroundColor={Style.BACKGROUND_COLOR}
              />
              <Style.Symbols>
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
          <Style.EditMenu testID="Reminder__Hover">
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
              action={props.onSetDone(!props.isDone)}
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
      </Style.Container>
    </Wrapper>
  );
};

export default Reminder;
