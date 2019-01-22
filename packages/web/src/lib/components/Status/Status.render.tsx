import * as React from 'react';
import Spinner from 'src/lib/components/Spinner';
import Text from 'src/lib/components/Text';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { Container, Position } from './Status.style';

interface IProps {
  errorText?: TextType;
  isLoading: boolean;
  loadingText?: TextType;
  backgroundColor: BackgroundColorVal;
  spinnerTestID?: string;
  errorTextTestID?: string;
}

/**
 * Show a loading or error status
 */
const Status = ({
  errorText,
  isLoading,
  loadingText,
  backgroundColor,
  spinnerTestID,
  errorTextTestID,
  ...props
}: IProps) => (
  <Container>
    <Position>
      {isLoading && <Spinner text={loadingText} testID={spinnerTestID} />}
      {!isLoading && !!errorText && (
        <Text
          testID={errorTextTestID}
          text={errorText}
          error
          type="body2"
          backgroundColor={backgroundColor}
        />
      )}
    </Position>
  </Container>
);

export default Status;
