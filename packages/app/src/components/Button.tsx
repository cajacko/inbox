import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Children } from 'src/lib/types/libs';

interface IProps {
  action?: () => void;
  children: Children;
  style?: { [key: string]: any };
}

/**
 * Render a native button
 */
const Button = ({ action, children, style }: IProps) => (
  <TouchableOpacity onPress={action} style={style}>
    {children}
  </TouchableOpacity>
);

export default Button;
