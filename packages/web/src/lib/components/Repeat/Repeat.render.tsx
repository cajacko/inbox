import * as React from 'react';
import Button from 'src/lib/components/Button';
import CustomDateTime from 'src/lib/components/CustomDateTime';
import DropDown from 'src/lib/components/DropDown';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';
import { RepeatTypes } from 'src/lib/store/types';
import { Text as TextType } from 'src/lib/types/general';
import * as Style from './Repeat.style';

const suggestions: Array<{
  key: string;
  testID?: string;
  payload: {
  type: RepeatTypes | 'NO_REPEAT';
  };
  text: TextType;
  }> = [
    {
      key: 'NO_REPEAT',
      payload: {
        type: 'NO_REPEAT',
      },
      text: { _textFromConst: 'Does not repeat' },
    },
    {
      key: 'DAILY',
      payload: {
        type: 'DAILY',
      },
      testID: 'RepeatModal__Suggestion--daily',
      text: { _textFromConst: 'Daily' },
    },
    {
      key: 'WEEKLY',
      payload: {
        type: 'WEEKLY',
      },
      text: { _textFromConst: 'Weekly' },
    },
    {
      key: 'MONTHLY',
      payload: {
        type: 'MONTHLY',
      },
      text: { _textFromConst: 'Monthly' },
    },
    {
      key: 'YEARLY',
      payload: {
        type: 'YEARLY',
      },
      text: { _textFromConst: 'Yearly' },
    },
  ];

export interface IProps {
  type: 'INIT' | 'SUGGESTIONS' | 'CUSTOM_DATE_TIME';
  setType: (type: IProps['type']) => () => void;
  onOpenRepeatStartDate: (type: RepeatTypes | 'NO_REPEAT') => () => void;
  text: string;
  onSetStartDate: (date: CustomDate) => void;
}

/**
 * Show the repeat forms
 */
const Repeat = ({
  type,
  setType,
  onOpenRepeatStartDate,
  text,
  onSetStartDate,
}: IProps) => {
  switch (type) {
    case 'CUSTOM_DATE_TIME':
      return <CustomDateTime onSetDateTime={onSetStartDate} />;

    case 'INIT':
      return (
        <Style.Container testID="RepeatModal">
          <Style.Header>
            <Text
              text={{ _textFromConst: 'Repeat' }}
              backgroundColor={BACKGROUND_COLORS.WHITE}
              type="h6"
            />
          </Style.Header>
          <DropDown
            text={{ _textFromConst: text }}
            action={setType('SUGGESTIONS')}
            analyticsAction="OPEN_DATE"
            analyticsCategory="REPEAT"
            buttonTestID="RepeatModal__Suggestions"
          />
        </Style.Container>
      );

    case 'SUGGESTIONS':
      return (
        <Style.Container>
          {suggestions.map(suggestion => (
            <Button
              key={suggestion.key}
              analyticsAction="SET_REPEAT_SUGGESTION"
              analyticsCategory="REPEAT"
              action={onOpenRepeatStartDate(suggestion.payload.type)}
              styles={{ flexDirection: 'row' }}
              testID={suggestion.testID}
            >
              {() => (
                <Style.Suggestion>
                  <Text
                    text={suggestion.text}
                    backgroundColor={BACKGROUND_COLORS.WHITE}
                  />
                </Style.Suggestion>
              )}
            </Button>
          ))}
        </Style.Container>
      );
    default:
      throw new AppError(`Invalid type given to Repeat: ${type}`, '100-021');
  }
};

export default Repeat;
