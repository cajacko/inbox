import * as React from 'react';

interface IProps {
  [key: string]: any;
}

export type Ref = any;

/**
 * On web just render the children
 */
const SwipeRow = ({ children }: IProps, ref: any) => children;

export default React.forwardRef(SwipeRow);
