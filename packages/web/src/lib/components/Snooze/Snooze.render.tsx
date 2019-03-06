/* eslint max-lines: 0 */
import * as React from 'react';
import { DatePicker, TimePicker } from 'src/components';
import Calendar from 'src/lib/assets/icons/CalendarAlt';
import ChevronDown from 'src/lib/assets/icons/ChevronDown';
import Button from 'src/lib/components/Button';
import Suggestion from 'src/lib/components/Suggestion';
import { ISuggestion as ISuggestionLoopItem } from 'src/lib/components/Suggestion/Suggestion.render';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
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
}

export interface IProps {
  type: 'SUGGESTIONS' | 'CALENDAR' | 'TIME' | 'CONFIRM' | 'TIME_SUGGESTIONS';
  suggestions: ISuggestion[];
  onSelectDateAndTime: () => void;
  onChangeDate: () => void;
  customDate: string;
  onSelectTime: () => void;
  customTimeLabel: string;
  customTime: string;
  suggestedTimes: ISuggestedTimes[];
  onChangeTime: () => void;
}

/**
 * Render and control the snooze modals
 */
const Snooze = ({
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
}: IProps) => {
  switch (type) {
    case 'SUGGESTIONS':
      return (
        <Style.Container testID="SnoozedModal">
          <Style.Suggestions>
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
      return <TimePicker onChange={onChangeTime} />;

    case 'CALENDAR':
      return <DatePicker onChange={onChangeDate} />;

    case 'CONFIRM':
      return (
        <Style.ConfirmContainer>
          <Style.ConfirmHeader>
            <Text
              text={{ _textFromConst: 'Select date and time' }}
              backgroundColor={BACKGROUND_COLORS.WHITE}
              type="h6"
            />
          </Style.ConfirmHeader>

          <Button
            analyticsAction="OPEN_DATE"
            analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
            action={onSelectDateAndTime}
          >
            {() => (
              <Style.ConfirmButton>
                <Text
                  text={{ _textFromConst: customDate }}
                  backgroundColor={BACKGROUND_COLORS.WHITE}
                />
                <Style.ConfirmRight>
                  <ChevronDown
                    size={Style.CHEVRON_SIZE}
                    backgroundColor={BACKGROUND_COLORS.WHITE}
                  />
                </Style.ConfirmRight>
              </Style.ConfirmButton>
            )}
          </Button>

          <Button
            analyticsAction="OPEN_TIME"
            analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
            action={onSelectTime}
          >
            {() => (
              <Style.ConfirmButton>
                <Text
                  text={customTimeLabel}
                  backgroundColor={BACKGROUND_COLORS.WHITE}
                />
                <Style.ConfirmRight>
                  <Style.ConfirmValue>
                    <Text
                      text={{ _textFromConst: customTime }}
                      backgroundColor={BACKGROUND_COLORS.WHITE}
                      greyedOut
                    />
                  </Style.ConfirmValue>
                  <ChevronDown
                    size={Style.CHEVRON_SIZE}
                    backgroundColor={BACKGROUND_COLORS.WHITE}
                  />
                </Style.ConfirmRight>
              </Style.ConfirmButton>
            )}
          </Button>

          <Style.ConfirmSaveButton>
            <Button
              text={{ _textFromConst: 'Save' }}
              analyticsAction="SAVE"
              analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
              type={getButtonType('TRANSPARENT.PRIMARY')}
            />
          </Style.ConfirmSaveButton>
        </Style.ConfirmContainer>
      );

    case 'TIME_SUGGESTIONS':
      return (
        <Style.TimeSuggestionsContainer>
          {suggestedTimes.map(suggestedTime => (
            <Button
              key={suggestedTime.label}
              analyticsAction="OPEN_TIME"
              analyticsCategory="SNOOZE_CUSTOM_CONFIRM"
              action={suggestedTime.onChangeTime}
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
