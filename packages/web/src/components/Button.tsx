import * as React from 'react';
import { Children } from 'src/lib/types/libs';

interface IProps {
  action?: () => void;
  children: Children;
  className?: string;
}

/**
 * Render a button for the web
 */
const Button = ({ action, children, className }: IProps) => (
  <button onClick={action} className={className}>
    {children}
  </button>
);

export default Button;
