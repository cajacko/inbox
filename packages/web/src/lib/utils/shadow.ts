import * as colors from 'src/lib/config/styles/colors';
import platformShadow from 'src/utils/shadow';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

/**
 * Return the background shadow styles to use
 */
const shadow = (
  offset: number = 2,
  radius: number = 5,
  opacity: number = 0.5,
  color: ColorVal = colors.BLACK,
  options = { hOffset: 0 },
  returnObject: boolean = false
) => {
  const result = platformShadow(
    offset,
    radius,
    opacity,
    color,
    options,
    returnObject
  );

  if (typeof result === 'string') return result;

  return '';
};

/**
 * Return the shadow props as an object
 */
export const shadowObj = (
  offset: number = 2,
  radius: number = 5,
  opacity: number = 0.5,
  color: ColorVal = colors.BLACK,
  options = { hOffset: 0 }
): { [key: string]: string | number } => {
  const result = platformShadow(offset, radius, opacity, color, options, true);

  if (typeof result === 'object') return result;

  return {};
};

export default shadow;
