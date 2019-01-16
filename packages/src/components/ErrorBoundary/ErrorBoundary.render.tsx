import * as React from 'react';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { Children } from 'src/lib/types/libs';
import { Container } from './ErrorBoundary.style';

interface IProps {
  hasError: boolean;
  title?: string;
  message?: string;
  code?: string;
  action?: () => void;
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

  return (
    <Container>
      {code ? <Text text={`Code: ${code}`} /> : null}
      {title ? <Text text={`Title: ${title}`} /> : null}
      {message ? <Text text={`Message: ${message}`} /> : null}
      {actionText && action ? <Button text={actionText} /> : null}
    </Container>
  );
};

export default ErrorBoundary;
