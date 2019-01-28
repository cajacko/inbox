/* eslint max-len: 0 no-underscore-dangle: 0 */
import * as React from 'react';
// tslint:disable-next-line
import { Svg, Path } from 'src/components/Svg';
import * as colors from 'src/lib/config/styles/colors';
import { BackgroundColorVal, COLORS_FOR_BACKGROUND } from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
import getSvgProps from 'src/lib/utils/getSvgProps';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

interface IProps {
  size: number;
  testID?: string;
  backgroundColor: BackgroundColorVal | { _dangerouslySetColor: ColorVal };
}

/**
 * Bars icon
 */
const Bars = ({
  size,
  testID,
  backgroundColor,
}: IProps) => {
  let color;

  if (typeof backgroundColor === 'string') {
    color = COLORS_FOR_BACKGROUND[backgroundColor].default;
  } else {
    color = backgroundColor._dangerouslySetColor;
  }

  if (!color) {
    throw new AppError('Could not get a color for the icon', '100-011');
  }

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 448 512')}>
      <Path fill={color} d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
    </Svg>
  );
};

export default Bars;
