import * as React from 'react';
import { Children } from '../../types/libs';
import Button from '../Button';
import View from '../Layout/View';
import Text from '../Text';

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
 * Markup for the error boundary component, displays the error message and optional actions
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
    <View>
      {code ? <Text text={`Code: ${code}`} /> : null}
      {title ? <Text text={`Title: ${title}`} /> : null}
      {message ? <Text text={`Message: ${message}`} /> : null}
      {actionText && action ? <Button text={actionText} /> : null}
    </View>
  );
};

export default ErrorBoundary;
