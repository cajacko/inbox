import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import mergeClasses from 'src/utils/mergeClasses';

interface IProps {
  action?: () => void;
  children: Children;
  className?: string;
  testID?: string;
}

/**
 * Render a button for the web
 */
const Button = ({
  action, children, className, testID,
}: IProps) => (
  <button onClick={action} className={mergeClasses(className, testID)}>
    {children}
  </button>
);

export default Button;
