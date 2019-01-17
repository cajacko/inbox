import * as React from 'react';
import { Type } from 'src/lib/config/styles/text';
import { BackgroundColor, Color } from 'src/lib/config/styles/textIconColors';
import withText from 'src/lib/HOCs/withText';
import { Text as StyledText, transformText } from './Text.style';

export interface IProps {
  type?: Type;
  backgroundColor?: BackgroundColor;
  _dangerouslySetColor?: Color;
  highlight?: boolean;
  greyedOut?: boolean;
  error?: boolean;
  center?: boolean;
}

interface IAll extends IProps {
  text: string;
}

/**
 * Display some text, whilst doing any transformations as necessary
 */
const Text = ({ text, ...props }: IAll) => (
  <StyledText {...props}>{transformText(text, props)}</StyledText>
);

export default withText('text')(Text);
