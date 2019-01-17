// Can't get that long line to wrap without prettier being a dick
/* eslint max-len: 0 */

import cloneDeep from 'lodash/cloneDeep';
import * as React from 'react';
import getText from 'src/lib/utils/getText';

type PropKeys = string[];

interface IProps {
  [key: string]: any;
}

/**
 * Get the actual text for the component, given the marketing text or
 * an override object.
 */
const withText = (...propKeys: PropKeys) => (Component: React.ComponentType<IProps>) => (props: IProps) => {
  const newProps = cloneDeep(props);

  propKeys.forEach((key) => {
    const val = props[key];

    if (val === undefined) return;

    const text = getText(val);

    newProps[key] = text;
  });

  return <Component {...newProps} />;
};

export default withText;
