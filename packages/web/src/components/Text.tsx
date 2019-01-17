import * as React from 'react';
import mergeClasses from 'src/utils/mergeClasses';

interface IProps {
  children: string;
  className?: string;
  testID?: string;
  [key: string]: any;
}

/**
 * Render text on the web
 */
const Text = ({ children, className, testID }: IProps) => (
  <span className={mergeClasses(className, testID)}>{children}</span>
);

export default Text;
