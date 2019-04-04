import * as React from 'react';
import { Text as RNText } from 'react-native';

interface IProps {
  children: string;
  style?: { [key: string]: any };
  testID?: string;
  numberOfLines?: number;
}

/**
 * Render native text
 */
const Text = ({ children, style, numberOfLines }: IProps) => (
  <RNText style={style} numberOfLines={numberOfLines}>
    {children}
  </RNText>
);

export default Text;
