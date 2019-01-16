import * as React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  action?: () => void;
  children: React.ReactNode;
}

/**
 * Render a native button
 */
const Button = ({ action, children }: IProps) => (
  <TouchableOpacity onPress={action}>{children}</TouchableOpacity>
);

export default Button;
