import * as React from 'react';
import mergeClasses from 'src/utils/mergeClasses';
import styled from 'styled-components';

interface IProps {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  className?: string;
  testID?: string;
}

type Ref = React.RefObject<HTMLInputElement>;

const Input = styled.input`
  display: flex;
`;

export type TextInputRef = HTMLInputElement;

/**
 * Wrap the onChange func so it only passes the text
 */
const onChangeVal = (onChange: IProps['onChange']) => (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange(e.target.value);
};

/**
 * Render text on the web
 */
const TextInput = React.forwardRef((props: IProps, ref: Ref) => (
  <Input
    className={mergeClasses(props.className, props.testID)}
    ref={ref}
    {...props}
    onChange={onChangeVal(props.onChange)}
  />
));

export default TextInput;
