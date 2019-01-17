import * as React from 'react';
import { Text as RNText } from 'react-native';

interface IProps {
  children: string;
  style?: { [key: string]: any };
}

/**
 * Render native text
 */
const Text = ({ children, style }: IProps) => (
  <RNText style={style}>{children}</RNText>
);

export default Text;
