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
 * SignOut icon
 */
const SignOut = ({
  size,
  testID,
  ...props
}: IProps) => {
  const color = textIconColor(props);

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 512 512')}>
      <Path fill={color} d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/>
    </Svg>
  );
};

export default SignOut;