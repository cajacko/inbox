import { Platform } from 'react-native';
import * as colors from 'src/lib/config/styles/colors';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

/**
 * Get a values unless it is undefined
 */
const getVal = (defaultVal: any, override?: any) => {
  if (override === undefined) return defaultVal;

  return override;
};

/**
 * Return the styled for a web drop shadow
 */
const shadow = (
  offset: number,
  radius: number,
  opacity: number,
  color: ColorVal,
  options: { elevation?: number; hOffset?: number; vOffset?: number }
) =>
  (Platform.OS === 'ios'
    ? `
  shadow-color: ${color};
  shadow-offset: ${getVal(offset, options.hOffset)}px ${getVal(
      offset,
      options.vOffset
    )}px;
  shadow-opacity: ${opacity};
  shadow-radius: ${radius};
`
    : `elevation: ${options.elevation === undefined ? 5 : options.elevation};`);

export default shadow;
