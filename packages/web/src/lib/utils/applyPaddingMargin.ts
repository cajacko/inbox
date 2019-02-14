import unit from 'src/utils/unit';

export interface IProps {
  bottom?: number;
  horizontal?: number;
  left?: number;
  right?: number;
  top?: number;
  vertical?: number;
}

export interface IObj {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

/**
 * Consistently apply the padding or margin, as native doesn't support
 * "padding: 10"
 */
const applyPaddingMargin = (type: 'margin' | 'padding') => (
  props: number | IProps,
  returnObject?: boolean
) => {
  let left;
  let right;
  let top;
  let bottom;

  if (typeof props === 'number') {
    left = props;
    right = props;
    top = props;
    bottom = props;
  } else if (typeof props === 'object') {
    if (typeof props.horizontal === 'number') {
      left = props.horizontal;
      right = props.horizontal;
    }

    if (typeof props.vertical === 'number') {
      top = props.vertical;
      bottom = props.vertical;
    }

    if (typeof props.top === 'number') ({ top } = props);
    if (typeof props.left === 'number') ({ left } = props);
    if (typeof props.right === 'number') ({ right } = props);
    if (typeof props.bottom === 'number') ({ bottom } = props);
  }

  /**
   * Apply the padding or ignore it
   */
  const apply = (pos: 'top' | 'left' | 'right' | 'bottom', val?: number) => {
    if (typeof val !== 'number') return '';

    return `${type}-${pos}: ${unit(val)}`;
  };

  if (returnObject) {
    const obj: IObj = {
      [`${type}Top`]: top && unit(top),
      [`${type}Left`]: left && unit(left),
      [`${type}Right`]: right && unit(right),
      [`${type}Bottom`]: bottom && unit(bottom),
    };

    return obj;
  }

  return `
    ${apply('top', top)}
    ${apply('left', left)}
    ${apply('right', right)}
    ${apply('bottom', bottom)}
  `;
};

export default applyPaddingMargin;
