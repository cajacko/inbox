import * as React from 'react';

interface IProps {
  action?: () => void;
  children: React.ReactNode;
}

/**
 * Render a button for the web
 */
const Button = ({ action, children }: IProps) => (
  <button onClick={action}>{children}</button>
);

export default Button;
