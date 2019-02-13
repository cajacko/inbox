import * as React from 'react';
import mergeClasses from 'src/utils/mergeClasses';
import styled from 'styled-components';

interface IProps {
  className?: string;
  onChange: (val: string) => void;
  placeholder: string;
  testID?: string;
  value: string;
  onSubmit: () => void;
}

type Ref = React.RefObject<HTMLInputElement>;

const Input = styled.input`
  display: flex;
`;

const Form = styled.form`
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
 * Wrap the onSubmit func, so we don't reload the page
 */
const onSubmit = (submit: IProps['onSubmit']) => (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  submit();
};

/**
 * Render text on the web
 */
const TextInput = React.forwardRef((props: IProps, ref: Ref) => (
  <Form onSubmit={onSubmit(props.onSubmit)}>
    <Input
      {...props}
      ref={ref}
      className={mergeClasses(props.className, props.testID)}
      onChange={onChangeVal(props.onChange)}
    />
  </Form>
));

export default TextInput;
