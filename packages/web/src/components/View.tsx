import * as React from 'react';
import { Children } from '../lib/types/libs';

interface IProps {
  children: Children;
}

/**
 * Render text on the web
 */
const View = ({ children }: IProps) => <div>{children}</div>;

export default View;
