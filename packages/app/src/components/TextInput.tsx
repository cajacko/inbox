import * as React from 'react';
import { TextInput as RNTextInput } from 'react-native';

interface IProps {
  className?: string;
  onChange: (val: string) => void;
  placeholder: string;
  testID?: string;
  value: string;
  onSubmit: () => void;
  style?: { [key: string]: any };
}

type Ref = React.RefObject<RNTextInput>;

export type TextInputRef = RNTextInput;

/**
 * Render text on the web
 */
const TextInput = React.forwardRef(({
  onChange, placeholder, value, onSubmit, style,
}: IProps, ref: Ref) => (
    <RNTextInput
      ref={ref}
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      onSubmitEditing={onSubmit}
      style={style}
    />
));

export default TextInput;
