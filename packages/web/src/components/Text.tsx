import * as React from 'react';

interface IProps {
  children: string;
  className?: string;
  [key: string]: any;
}

/**
 * Render text on the web
 */
const Text = ({ children, className }: IProps) => (
  <span className={className}>{children}</span>
);

export default Text;
