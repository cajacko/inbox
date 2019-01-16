import * as React from 'react';

interface IProps {
  text: string;
}

/**
 * Render text on the web
 */
const Text = ({ text }: IProps) => <span>{text}</span>;

export default Text;
