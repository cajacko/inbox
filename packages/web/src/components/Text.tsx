import * as React from 'react';
import AppError from 'src/lib/modules/AppError';

interface IProps {
  children: string;
  className?: string;
  [key: string]: any;
}

/**
 * Render text on the web
 */
const Text = ({ children, className }: IProps) => {
  if (children === 'All good') {
    throw new AppError('Text error', '100-003');
  }
  return <span className={className}>{children}</span>;
};

export default Text;
