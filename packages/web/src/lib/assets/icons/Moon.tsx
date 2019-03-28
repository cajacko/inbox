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
 * Moon icon
 */
const Moon = ({
  size,
  testID,
  ...props
}: IProps) => {
  const color = textIconColor(props);

  return (
    <Svg testID={testID} {...getSvgProps(size, '0 0 512 512')}>
      <Path fill={color} d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775 28.27-34.831-2.558-85.722-46.249-77.401-82.348 15.683-158.272-47.268-158.272-130.792 0-48.424 26.06-92.292 67.434-115.836 38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256 0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478-54.76 31.163-91.693 90.042-91.693 157.554 0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"/>
    </Svg>
  );
};

export default Moon;
