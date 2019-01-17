import * as React from 'react';

interface IProps {
  text: string;
  className?: string;
  [key: string]: any;
}

/**
 * Render text on the web
 */
const Text = ({ text, className }: IProps) => (
  <span className={className}>{text}</span>
);

export default Text;
