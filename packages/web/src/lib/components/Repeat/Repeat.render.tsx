import * as React from 'react';
import Button from 'src/lib/components/Button';
import CustomDateTime from 'src/lib/components/CustomDateTime';
import DropDown from 'src/lib/components/DropDown';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';
import * as Style from './Repeat.style';

const suggestions = [
  {
    payload: {
      type: 'NO_REPEAT',
    },
    text: { _textFromConst: 'Does not repeat' },
  },
  {
    payload: {
      type: 'DAILY',
    },
    text: { _textFromConst: 'Daily' },
  },
  {
    payload: {
      type: 'WEEKLY',
    },
    text: { _textFromConst: 'Weekly' },
  },
  {
    payload: {
      type: 'MONTHLY',
    },
    text: { _textFromConst: 'Monthly' },
  },
  {
    payload: {
      type: 'YEARLY',
    },
    text: { _textFromConst: 'Yearly' },
  },
];

export interface IProps {
  type: 'INIT' | 'SUGGESTIONS' | 'CUSTOM_DATE_TIME';
  setType: (type: IProps['type']) => () => void;
  onOpenRepeatStartDate: (payload: any) => () => void;
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
        <Style.Container>
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
          />
        </Style.Container>
      );

    case 'SUGGESTIONS':
      return (
        <Style.Container>
          {suggestions.map(suggestion => (
            <Button
              key={suggestion.text._textFromConst}
              analyticsAction="SET_REPEAT_SUGGESTION"
              analyticsCategory="REPEAT"
              action={onOpenRepeatStartDate(suggestion.payload)}
              styles={{ flexDirection: 'row' }}
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
