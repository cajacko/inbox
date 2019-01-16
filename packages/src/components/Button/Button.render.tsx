import * as React from 'react';
import { Button as UIButton, Text } from '../../../ui';

interface IProps {
  text: string;
  action: () => void;
}

/**
 * Render a standard button
 */
const Button = ({ action, text }: IProps) => (
  <UIButton action={action}>
    <Text text={text} />
  </UIButton>
);

export default Button;
