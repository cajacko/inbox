/* eslint max-lines: 0 */
import * as React from 'react';
import DatePicker from 'src/components/DatePicker';
import TimePicker from 'src/components/TimePicker';
import Calendar from 'src/lib/assets/icons/CalendarAlt';
import ChevronLeft from 'src/lib/assets/icons/ChevronLeft';
import Button from 'src/lib/components/Button';
import DropDown from 'src/lib/components/DropDown';
import Suggestion from 'src/lib/components/Suggestion';
import { ISuggestion as ISuggestionLoopItem } from 'src/lib/components/Suggestion/Suggestion.render';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';
import getButtonType from 'src/lib/utils/getButtonType';
import * as Style from './Snooze.style';

const suggestionsAction = {
  laterThisWeek: 'SUGGESTION_LATER_THIS_WEEK',
  laterToday: 'SUGGESTION_LATER_TODAY',
  nextWeek: 'SUGGESTION_NEXT_WEEK',
  nextWeekend: 'SUGGESTION_NEXT_WEEKEND',
  thisWeekend: 'SUGGESTION_THIS_WEEKEND',
  tomorrow: 'SUGGESTION_TOMORROW',
};

export interface ISuggestion extends ISuggestionLoopItem {
  key: keyof typeof suggestionsAction;
}

export interface ISuggestedTimes {
  label: string;
  time?: string;
  onChangeTime: () => void;
  testID: string;
}

export interface IProps {
  type: 'SUGGESTIONS' | 'CALENDAR' | 'TIME' | 'CONFIRM' | 'TIME_SUGGESTIONS' | 'ERROR';
  suggestions: ISuggestion[];
  onSelectDateAndTime: () => void;
  onChangeDate: (date: CustomDate) => void;
  customDate: string;
  onSelectTime: () => void;
  customTimeLabel: string;
  customTime: string;
  suggestedTimes: ISuggestedTimes[];
  onChangeTime: (date: CustomDate | null) => void;
  onSave: () => void;
  customDateObject: CustomDate;
  onBack: () => void;
}

/**
 * Render and control the snooze modals
 */
const Snooze = ({
  customDateObject,
  type,
  suggestions,
  onSelectDateAndTime,
  onChangeDate,
  customDate,
  onSelectTime,
  customTimeLabel,
  customTime,
  suggestedTimes,
  onChangeTime,
  onSave,
  onBack,
}: IProps) => {
  const testID = 'SnoozedModal';

  const confirm = (
    <Style.ConfirmContainer testID={testID}>
      <Style.ConfirmHeader testID="SnoozeConfirm__ConfirmModal">
        <Text
          text={{ _textFromConst: 'Select date and time' }}
          backgroundColor={BACKGROUND_COLORS.WHITE}
          type="h6"
        />
      </Style.ConfirmHeader>


      <DropDown
        text={{ _textFromConst: customDate }}
        action={onSelectDateAndTime}
        analyticsAction="OPEN_DATE"
        analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
      />

      <DropDown
        text={{ _textFromConst: customTime }}
        action={onSelectTime}
        analyticsAction="OPEN_TIME"
        analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
      />

      <Style.ConfirmSaveButton>
        <Button
          text={{ _textFromConst: 'Save' }}
          analyticsAction="SAVE"
          analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
          type={getButtonType('TRANSPARENT.PRIMARY')}
          testID="SnoozeConfirm__Save"
          action={onSave}
        />
      </Style.ConfirmSaveButton>
    </Style.ConfirmContainer>
  );

  switch (type) {
    case 'ERROR':
      return (
        <Style.ConfirmContainer testID={testID}>
          <Button
            analyticsAction="ERROR_BACK"
            analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
            action={onBack}
            styles={{ flexDirection: 'row', flex: 1 }}
            icon={ChevronLeft}
            text={{ _textFromConst: 'Back' }}
            iconLeft
            type={getButtonType('TRANSPARENT.PRIMARY')}
            leftAlign
            testID="Snooze__ErrorModalBack"
          />
          <Style.Error testID="Snooze__ErrorModal">
            <Text
              text={{ _textFromConst: 'Can not snooze to a past date, go back and pick future date' }}
              backgroundColor={BACKGROUND_COLORS.WHITE}
              type="body1"
            />
          </Style.Error>
        </Style.ConfirmContainer>
      );

    case 'SUGGESTIONS':
      return (
        <Style.Container testID={testID}>
          <Style.Suggestions testID="Snooze__DateSuggestions">
            {suggestions.map(({ key, ...suggestion }) => (
              <Style.Suggestion key={key}>
                <Suggestion
                  backgroundColor={Style.SUGGESTION_BACKGROUND}
                  analyticsCategory="SUGGESTION_MENU"
                  analyticsAction={suggestionsAction[key]}
                  {...suggestion}
                />
              </Style.Suggestion>
            ))}
          </Style.Suggestions>
          <Style.Footer>
            <Style.Suggestion>
              <Suggestion
                analyticsAction="SELECT_DATE_TIME"
                analyticsCategory="SUGGESTION_MENU"
                backgroundColor={Style.FOOTER_BACKGROUND}
                icon={Calendar}
                title={{ _textFromConst: 'Select date and time' }}
                testID="Suggestion--SelectDateTime"
                action={onSelectDateAndTime}
              />
            </Style.Suggestion>
          </Style.Footer>
        </Style.Container>
      );

    case 'TIME':
      return (
        <TimePicker
          onChange={onChangeTime}
          testID="Snooze--TimePicker"
          backgroundComponent={confirm}
        />
      );

    case 'CALENDAR':
      return (
        <DatePicker
          date={customDateObject}
          onChange={onChangeDate}
          testID="Snooze--DatePicker"
          backgroundComponent={confirm}
        />
      );

    case 'CONFIRM':
      return confirm;

    case 'TIME_SUGGESTIONS':
      return (
        <Style.TimeSuggestionsContainer testID="SnoozedModal__TimeSuggestions">
          {suggestedTimes.map(suggestedTime => (
            <Button
              key={suggestedTime.label}
              analyticsAction="OPEN_TIME"
              analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
              action={suggestedTime.onChangeTime}
              testID={suggestedTime.testID}
              styles={{ flexDirection: 'row' }}
            >
              {() => (
                <Style.TimeSuggestion>
                  <Text
                    text={{ _textFromConst: suggestedTime.label }}
                    backgroundColor={BACKGROUND_COLORS.WHITE}
                  />
                  {suggestedTime.time && (
                    <Text
                      text={{ _textFromConst: suggestedTime.time }}
                      backgroundColor={BACKGROUND_COLORS.WHITE}
                      greyedOut
                    />
                  )}
                </Style.TimeSuggestion>
              )}
            </Button>
          ))}
        </Style.TimeSuggestionsContainer>
      );

    default:
      throw new AppError(`Invalid type given to Snooze: ${type}`, '100-021');
  }
};

export default Snooze;
