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
 * Inbox icon
 */
const Inbox = ({
  size,
  testID,
  ...props
}: IProps) => {
  const color = textIconColor(props);

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 576 512')}>
      <Path fill={color} d="M567.938 243.908L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L8.062 243.908A47.994 47.994 0 0 0 0 270.533V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V270.533a47.994 47.994 0 0 0-8.062-26.625zM162.252 128h251.497l85.333 128H376l-32 64H232l-32-64H76.918l85.334-128z"/>
    </Svg>
  );
};

export default Inbox;
