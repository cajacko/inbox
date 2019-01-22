import * as React from 'react';
import Text from 'src/lib/components/Text';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { Container, Position } from './ErrorText.style';

interface IProps {
  text: TextType;
  testID?: string;
  backgroundColor?: BackgroundColorVal;
  height?: number;
}

/**
 * Display some error text in a consistent way
 */
const ErrorText = ({ text, height, ...props }: IProps) => {
  const textComponent = <Text text={text} error type="body2" {...props} />;

  if (!height) return textComponent;

  return (
    <Container height={height}>
      <Position>{textComponent}</Position>
    </Container>
  );
};

export default ErrorText;
