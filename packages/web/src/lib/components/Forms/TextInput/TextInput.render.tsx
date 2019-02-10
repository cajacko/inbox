import * as React from 'react';
import { TextInput as UITextInput } from 'src/components';
import { TextInputRef } from 'src/components/TextInput';
import withText from 'src/lib/HOCs/withText';

interface IProps {
  value: string;
  placeholder: string;
  testID?: string;
  onChange: (text: string) => void;
}

type Ref = (ref: TextInputRef | null) => void;

/**
 * Render a simple text input
 */
const TextInput = React.forwardRef(({
  value, placeholder, testID, onChange,
}: IProps, ref: Ref) => (
    <UITextInput
      ref={ref}
      value={value}
      placeholder={placeholder}
      testID={testID}
      onChange={onChange}
    />
));

export default withText('placeholder')(TextInput);
