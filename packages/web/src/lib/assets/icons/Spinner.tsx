/* eslint max-len: 0 */
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
 * Spinner icon
 */
const Spinner = ({
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
    <Svg testID={testID} {...getSvgProps(size, '0 0 512 512')}>
      <Path fill={color} d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
    </Svg>
  );
};

export default Spinner;
