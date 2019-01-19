import * as React from 'react';
import { Button as UIButton } from 'src/components';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';

interface IProps {
  text: TextType;
  action: () => void;
  testID?: string;
  textTestID?: string;
}

/**
 * Render a standard button
 */
const Button = ({
  action, text, testID, textTestID,
}: IProps) => (
  <UIButton action={action} testID={testID}>
    <Text
      text={text}
      backgroundColor={BACKGROUND_COLORS.PRIMARY}
      testID={textTestID}
    />
  </UIButton>
);

export default Button;
