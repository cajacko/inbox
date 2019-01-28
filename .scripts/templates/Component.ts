/* eslint max-len: 0 no-underscore-dangle: 0 */
import * as React from 'react';
// tslint:disable-next-line
import { Svg<%= imports %> } from 'src/components/Svg';
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
 * <%= name %> icon
 */
const <%= name %> = ({
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
    <Svg testID={testID} {...getSvgProps(size, '<%= viewBox %>')}>
      <%- content %>
    </Svg>
  );
};

export default <%= name %>;
