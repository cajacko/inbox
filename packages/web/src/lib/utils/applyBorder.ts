import * as colors from 'src/lib/config/styles/colors';
import platform from 'src/utils/platform';
import unit from 'src/utils/unit';

type ColorKey = keyof typeof colors;
type ColorVal = typeof colors[ColorKey];

/**
 * Apply the border
 */
const applyBorder = (
  color: ColorVal,
  width: number = 1,
  {
    top,
    left,
    bottom,
    right,
  }: {
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
  } = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  }
) => {
  /**
   * Apply an individual position
   */
  const apply = (position: string, val?: boolean) => {
    if (!val) return '';

    return `
      border-${position}-width: ${unit(width)};
      border-${position}-color: ${color};
      ${platform() === 'web' ? `border-${position}-style: solid` : ''}
    `;
  };

  return `
    ${apply('top', top)}
    ${apply('bottom', bottom)}
    ${apply('left', left)}
    ${apply('right', right)}
  `;
};

export default applyBorder;
