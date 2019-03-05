import * as React from 'react';
import { View } from 'src/components';
import Calendar from 'src/lib/assets/icons/CalendarAlt';
import Suggestion from 'src/lib/components/Suggestion';
import { ISuggestion as ISuggestionLoopItem } from 'src/lib/components/Suggestion/Suggestion.render';
import AppError from 'src/lib/modules/AppError';
import {
  Container,
  Footer,
  FOOTER_BACKGROUND,
  Suggestion as SuggestionContainer,
  SUGGESTION_BACKGROUND,
  Suggestions,
} from './Snooze.style';

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

export interface IProps {
  type: 'SUGGESTIONS' | 'CALENDAR' | 'TIME' | 'CONFIRM';
  suggestions: ISuggestion[];
  onSelectDateAndTime: ISuggestion['action'];
}

/**
 * Render and control the snooze modals
 */
const Snooze = ({ type, suggestions, onSelectDateAndTime }: IProps) => {
  switch (type) {
    case 'SUGGESTIONS':
      return (
        <Container testID="SnoozedModal">
          <Suggestions>
            {suggestions.map(({ key, ...suggestion }) => (
              <SuggestionContainer key={key}>
                <Suggestion
                  backgroundColor={SUGGESTION_BACKGROUND}
                  analyticsCategory="SUGGESTION_MENU"
                  analyticsAction={suggestionsAction[key]}
                  {...suggestion}
                />
              </SuggestionContainer>
            ))}
          </Suggestions>
          <Footer>
            <SuggestionContainer>
              <Suggestion
                analyticsAction="SELECT_DATE_TIME"
                analyticsCategory="SUGGESTION_MENU"
                backgroundColor={FOOTER_BACKGROUND}
                icon={Calendar}
                title={{ _textFromConst: 'Select date and time' }}
                testID="Suggestion--SelectDateTime"
                action={onSelectDateAndTime}
              />
            </SuggestionContainer>
          </Footer>
        </Container>
      );

    case 'CALENDAR':
    case 'TIME':
    case 'CONFIRM':
      return <View>{null}</View>;

    default:
      throw new AppError(`Invalid type given to Snooze: ${type}`, '100-021');
  }
};

export default Snooze;
