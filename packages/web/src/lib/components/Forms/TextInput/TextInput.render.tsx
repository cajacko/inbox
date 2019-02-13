import * as React from 'react';
import { TextInputRef } from 'src/components/TextInput';
import { InputType } from 'src/lib/config/styles/text';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import withText from 'src/lib/HOCs/withText';
import { Input } from './TextInput.style';

interface IProps {
  value: string;
  placeholder: string;
  testID?: string;
  onChange: (text: string) => void;
  backgroundColor: BackgroundColorVal;
  error?: boolean;
  type?: InputType;
  onSubmit: () => void;
}

type Ref = (ref: TextInputRef | null) => void;

/**
 * Render a simple text input
 */
const TextInput = React.forwardRef((
  {
    value,
    placeholder,
    testID,
    onChange,
    backgroundColor,
    error,
    type,
    onSubmit,
  }: IProps,
  ref: Ref
) => (
    <Input
      ref={ref}
      onSubmit={onSubmit}
      value={value}
      placeholder={placeholder}
      testID={testID}
      onChange={onChange}
      customProps={{ backgroundColor, error, type }}
    />
));

export default withText('placeholder')(TextInput);
