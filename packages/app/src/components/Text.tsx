import * as React from "react";
import { Text as RNText } from "react-native";

interface Props {
  text: string;
}

const Text = ({ text }: Props) => <RNText>{text}</RNText>;

export default Text;
