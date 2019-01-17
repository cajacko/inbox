import * as React from 'react';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { Children } from 'src/lib/types/libs';
import {
  BottomMargin,
  Button as ButtonContainer,
  Container,
  Inner,
} from './ErrorBoundary.style';

interface IProps {
  hasError: boolean;
  title?: TextType;
  message?: TextType;
  code?: TextType;
  action?: () => void;
  actionText?: TextType;
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
            <Text text={title} backgroundColor={BACKGROUND_COLORS.WHITE} />
          </BottomMargin>
        )}

        {message && (
          <BottomMargin hasMargin={messageHasMargin}>
            <Text text={message} backgroundColor={BACKGROUND_COLORS.WHITE} />
          </BottomMargin>
        )}

        {code && (
          <BottomMargin hasMargin={codeHasMargin}>
            <Text text={code} backgroundColor={BACKGROUND_COLORS.WHITE} />
          </BottomMargin>
        )}

        {showButton && actionText && (
          <ButtonContainer>
            <Button action={action} text={actionText} />
          </ButtonContainer>
        )}
      </Inner>
    </Container>
  );
};

export default ErrorBoundary;
