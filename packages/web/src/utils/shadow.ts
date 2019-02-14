import Color from 'color';
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
  options: { hOffset?: number; vOffset?: number } = {},
  returnObject: boolean
) => {
  const val = `${getVal(offset, options.hOffset)}px ${getVal(
    offset,
    options.vOffset
  )}px ${radius}px ${Color(color).alpha(opacity)}`;

  if (returnObject) {
    return {
      boxShadow: val,
    };
  }

  return `box-shadow: ${val};`;
};

export default shadow;
