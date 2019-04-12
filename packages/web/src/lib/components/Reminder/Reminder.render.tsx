import * as React from 'react';
import Check from 'src/lib/assets/icons/Check';
import Clock from 'src/lib/assets/icons/Clock';
import Redo from 'src/lib/assets/icons/Redo';
import AnimateClose from 'src/lib/components/AnimateClose';
import Button from 'src/lib/components/Button';
import ReminderLink from 'src/lib/components/ReminderLink';
import ReminderMenu from 'src/lib/components/ReminderMenu';
import Status from 'src/lib/components/ReminderStatus';
import Text from 'src/lib/components/Text';
import * as Style from './Reminder.style';

export interface IContainerStateProps {
  text: string;
  saveStatus: 'saving' | 'saved' | 'error';
  isDone: boolean;
  isSnoozed: boolean;
  isRepeated: boolean;
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
  onPress: () => void;
  onLongPress: () => void;
  showMenu: boolean;
  buttonEvents: {
    onMouseEnter: Event;
    onMouseLeave: Event;
    onMouseMove: Event;
    onMouseOver: Event;
  };
  onSnooze: () => void;
  onRepeat: () => void;
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
const Reminder = (props: IProps) => {
  const heightProps = {
    hasBottomBorder: props.isFullWidth ? true : !props.isLast,
    hasTopBorder: props.isFullWidth && props.isFirst,
    hasUrl: !!props.url,
  };

  return (
    <AnimateClose
      height={Style.containerHeight(true, false)(heightProps)}
      testID="Reminder"
    >
      {({ closeAndRun }) => (
        <Style.Container key={props.id} {...heightProps}>
          <Style.Content {...props.buttonEvents} {...heightProps}>
            <Button
              analyticsAction="SHOW_EDIT_REMINDER"
              analyticsCategory="REMINDER"
              action={props.onPress}
              onLongPress={props.onLongPress}
              testID="Reminder__Button"
              styles={Style.buttonStyle}
              disableHover
            >
              {() => (
                <Style.Inner>
                  <Style.TextContainer>
                    <Style.TextWrapper>
                      <Text
                        testID="Reminder__Text"
                        text={{ _textFromConst: props.text }}
                        backgroundColor={Style.BACKGROUND_COLOR}
                        numberOfLines={1}
                      />
                    </Style.TextWrapper>
                  </Style.TextContainer>
                  <Style.Symbols>
                    {props.isRepeated && (
                      <Style.Icon testID="Reminder__RepeatedIcon">
                        <Redo
                          _dangerouslySetColor={Style.REPEATED_COLOR}
                          size={Style.ICON_SIZE}
                        />
                      </Style.Icon>
                    )}
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

            {props.showMenu && (
              <ReminderMenu
                onRepeat={props.onRepeat}
                edit={props.edit}
                onSnooze={props.onSnooze}
                url={props.url}
                onDelete={props.onDelete}
                onSetDone={closeAndRun(props.onSetDone(!props.isDone))}
                reminderSpacing={Style.reminderSpacing}
                backgroundColor={Style.BACKGROUND_COLOR}
              />
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
    </AnimateClose>
  );
};

export default Reminder;
