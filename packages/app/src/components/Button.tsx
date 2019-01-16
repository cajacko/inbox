import * as React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  action?: () => void;
  children: React.ReactNode;
}

const Button = ({ action, children }: Props) => (
  <TouchableOpacity onPress={action}>{children}</TouchableOpacity>
);

export default Button;
