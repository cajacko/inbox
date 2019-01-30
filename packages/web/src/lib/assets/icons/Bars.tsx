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
 * Bars icon
 */
const Bars = ({
  size,
  testID,
  ...props
}: IProps) => {
  const color = textIconColor(props);

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 448 512')}>
      <Path fill={color} d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
    </Svg>
  );
};

export default Bars;
