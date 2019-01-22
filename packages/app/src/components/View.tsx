import * as React from 'react';
import { View as RNView } from 'react-native';
import { Children } from 'src/lib/types/libs';

interface IProps {
  children: Children;
  style?: { [key: string]: any };
  testID?: string;
}

/**
 * Render text on the web
 */
const View = ({ children, style, ...props }: IProps) => (
  <RNView style={style} {...props}>
    {children}
  </RNView>
);

export default View;
