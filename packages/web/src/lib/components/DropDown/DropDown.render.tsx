import * as React from 'react';
import ChevronDown from 'src/lib/assets/icons/ChevronDown';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { CHEVRON_SIZE, Container, Right, RightText } from './DropDown.style';

export interface IProps {
  analyticsAction: string;
  analyticsCategory: string;
  action: () => void;
  text: TextType;
  textTestID?: string;
  buttonTestID?: string;
  rightText?: TextType;
  rightTextTestID?: string;
}

/**
 * Show the repeat forms
 */
const DropDown = ({
  analyticsAction,
  analyticsCategory,
  action,
  text,
  textTestID,
  buttonTestID,
  rightText,
  rightTextTestID,
}: IProps) => (
  <Button
    analyticsAction={analyticsAction}
    analyticsCategory={analyticsCategory}
    action={action}
    styles={{ flexDirection: 'row' }}
    testID={buttonTestID}
  >
    {() => (
      <Container>
        <Text
          text={text}
          backgroundColor={BACKGROUND_COLORS.WHITE}
          testID={textTestID}
        />
        <Right>
          {rightText && (
            <RightText>
              <Text
                greyedOut
                text={rightText}
                backgroundColor={BACKGROUND_COLORS.WHITE}
                testID={rightTextTestID}
              />
            </RightText>
          )}
          <ChevronDown
            size={CHEVRON_SIZE}
            backgroundColor={BACKGROUND_COLORS.WHITE}
          />
        </Right>
      </Container>
    )}
  </Button>
);

export default DropDown;
