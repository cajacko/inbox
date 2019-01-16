import * as React from 'react';
import { Text as RNText } from 'react-native';

interface IProps {
  text: string;
}

/**
 * Render native text
 */
const Text = ({ text }: IProps) => <RNText>{text}</RNText>;

export default Text;
