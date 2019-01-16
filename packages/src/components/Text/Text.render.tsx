import * as React from 'react';
import { Type } from 'src/lib/config/styles/text';
import withText from 'src/lib/HOCs/withText';
import { Text as StyledText, transformText } from './Text.style';

interface IProps {
  text: string;
  type?: Type;
}

/**
 * Display some text, whilst doing any transformations as necessary
 */
const Text = ({ text, ...props }: IProps) => (
  <StyledText {...props}>{transformText(text, props)}</StyledText>
);

export default withText('text')(Text);
