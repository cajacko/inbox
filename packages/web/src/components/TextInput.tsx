import * as React from 'react';
import mergeClasses from 'src/utils/mergeClasses';
import styled from 'styled-components';

interface IProps {
  className?: string;
  onChange: (val: string) => void;
  placeholder: string;
  testID?: string;
  value: string;
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
    {...props}
    ref={ref}
    className={mergeClasses(props.className, props.testID)}
    onChange={onChangeVal(props.onChange)}
  />
));

export default TextInput;
