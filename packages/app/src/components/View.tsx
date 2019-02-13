import * as React from 'react';
import { View as RNView } from 'react-native';
import { Children } from 'src/lib/types/libs';

interface IProps {
  // Styled components require their to be a child in react-native
  children: Children;
  style?: { [key: string]: any };
  testID?: string;
  onHover?: boolean;
}

/**
 * Render text on the web
 */
const View = ({ children, style, ...props }: IProps) => (
  <RNView style={style} {...props}>
    {typeof children === 'function' ? children({}) : children}
  </RNView>
);

export default View;
