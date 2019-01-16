import * as React from 'react';
import { Children } from 'src/lib/types/libs';

interface IProps {
  action?: () => void;
  children: Children;
}

/**
 * Render a button for the web
 */
const Button = ({ action, children }: IProps) => (
  <button onClick={action}>{children}</button>
);

export default Button;
