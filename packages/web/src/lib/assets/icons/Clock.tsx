/* eslint max-len: 0 no-underscore-dangle: 0 */
/* eslint react/jsx-tag-spacing: 0 */
import * as React from 'react';
// tslint:disable-next-line
import { Svg, Path } from 'src/components/Svg';
import {
  BackgroundColorVal,
  ColorVal,
} from 'src/lib/config/styles/textIconColors';
import getSvgProps from 'src/lib/utils/getSvgProps';
import textIconColor from 'src/lib/utils/textIconColor';

interface IProps {
  size: number;
  testID?: string;
  backgroundColor?: BackgroundColorVal;
  _dangerouslySetColor?: ColorVal;
  highlight?: boolean;
  greyedOut?: boolean;
  error?: boolean;
}

/**
 * Clock icon
 */
const Clock = ({
  size,
  testID,
  ...props
}: IProps) => {
  const color = textIconColor(props);

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 512 512')}>
      <Path fill={color} d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/>
    </Svg>
  );
};

export default Clock;
