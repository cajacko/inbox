import * as React from 'react';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { Children } from 'src/lib/types/libs';
import marketingCopy from 'src/lib/utils/marketingCopy';
import {
  BACKGROUND_COLOR,
  BottomMargin,
  Button as ButtonContainer,
  Container,
  Inner,
} from './ErrorBoundary.style';

type Func = () => void;

interface IProps {
  hasError: boolean;
  title?: string;
  message?: string;
  code?: string;
  action?: Func;
  actionText?: string;
  children: Children;
}

/**
 * Markup for the error boundary component, displays the error message and
 * optional actions
 */
const ErrorBoundary = ({
  hasError,
  title,
  message,
  code,
  action,
  actionText,
  children,
}: IProps) => {
  if (!hasError) {
    return <>{children}</>;
  }

  const showButton = !!(actionText && action);
  const titleHasMargin = !!(message || code || showButton);
  const messageHasMargin = !!(code || showButton);
  const codeHasMargin = showButton;

  return (
    <Container>
      <Inner>
        {title && (
          <BottomMargin hasMargin={titleHasMargin}>
            <Text
              text={title}
              type="h5"
              center
              backgroundColor={BACKGROUND_COLOR}
            />
          </BottomMargin>
        )}

        {message && (
          <BottomMargin hasMargin={messageHasMargin}>
            <Text text={message} center backgroundColor={BACKGROUND_COLOR} />
          </BottomMargin>
        )}

        {code && (
          <BottomMargin hasMargin={codeHasMargin}>
            <Text
              text={{
                _textFromConst: `${marketingCopy.get('GenericErrorBoundary.ErrorCode')}: ${code}`,
              }}
              type="overline"
              center
              backgroundColor={BACKGROUND_COLOR}
            />
          </BottomMargin>
        )}

        {showButton && actionText && (
          <ButtonContainer>
            <Button action={action} text={{ _textFromConst: actionText }} />
          </ButtonContainer>
        )}
      </Inner>
    </Container>
  );
};

export default ErrorBoundary;