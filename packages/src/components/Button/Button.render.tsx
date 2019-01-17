import * as React from 'react';
import { Button as UIButton } from 'src/components';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';

interface IProps {
  text: TextType;
  action: () => void;
}

/**
 * Render a standard button
 */
const Button = ({ action, text }: IProps) => (
  <UIButton action={action}>
    <Text text={text} backgroundColor={BACKGROUND_COLORS.PRIMARY} />
  </UIButton>
);

export default Button;
