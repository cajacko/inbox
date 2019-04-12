import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Children } from 'src/lib/types/libs';

interface IProps {
  action?: () => void;
  children: Children;
  style?: { [key: string]: any };
  testID?: string;
  onLongPress?: () => void;
}

/**
 * Render a native button
 */
const Button = ({
  action, children, style, onLongPress,
}: IProps) => (
  <TouchableOpacity onPress={action} onLongPress={onLongPress} style={style}>
    {children}
  </TouchableOpacity>
);

export default Button;
