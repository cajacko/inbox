/* eslint max-lines: 0 */
import * as React from 'react';
import Button from 'src/lib/components/Button';
import { ISuggestedTimes } from 'src/lib/components/CustomDateTime/Container/Container.render';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import {
  TimeSuggestion as Suggestion,
  TimeSuggestionsContainer as Container,
} from './TimeSuggestions.style';

export interface IProps {
  suggestedTimes: ISuggestedTimes[];
}

/**
 * Render and control the snooze modals
 */
const TimeSuggestions = ({ suggestedTimes }: IProps) => (
  <Container testID="SnoozedModal__TimeSuggestions">
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
          <Suggestion>
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
          </Suggestion>
        )}
      </Button>
    ))}
  </Container>
);

export default TimeSuggestions;
