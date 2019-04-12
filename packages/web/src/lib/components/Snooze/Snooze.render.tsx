/* eslint max-lines: 0 */
import * as React from 'react';
import Calendar from 'src/lib/assets/icons/CalendarAlt';
import CustomDateTime from 'src/lib/components/CustomDateTime';
import Error from 'src/lib/components/CustomDateTime/Error';
import Suggestion from 'src/lib/components/Suggestion';
import { ISuggestion as ISuggestionLoopItem } from 'src/lib/components/Suggestion/Suggestion.render';
import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';
import {
  Container,
  Footer,
  FOOTER_BACKGROUND,
  SUGGESTION_BACKGROUND,
  SuggestionContainer,
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
  type: 'SUGGESTIONS' | 'CUSTOM_DATE_TIME' | 'ERROR';
  suggestions: ISuggestion[];
  onSelectCustomDateTime: () => void;
  onSetDateTime: (date: CustomDate) => void;
  onBack: () => void;
}

/**
 * Render and control the snooze modals
 */
const Snooze = ({
  type,
  suggestions,
  onSelectCustomDateTime,
  onSetDateTime,
  onBack,
}: IProps) => {
  const testID = 'SnoozedModal';

  switch (type) {
    case 'CUSTOM_DATE_TIME':
      return <CustomDateTime onSetDateTime={onSetDateTime} testID={testID} />;

    case 'ERROR':
      return <Error onBack={onBack} />;

    case 'SUGGESTIONS':
      return (
        <Container testID={testID}>
          <Suggestions testID="Snooze__DateSuggestions">
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
                action={onSelectCustomDateTime}
              />
            </SuggestionContainer>
          </Footer>
        </Container>
      );

    default:
      throw new AppError(`Invalid type given to Snooze: ${type}`, '100-021');
  }
};

export default Snooze;
