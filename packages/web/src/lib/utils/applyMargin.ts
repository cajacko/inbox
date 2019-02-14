import applyPaddingMargin, {
  IObj,
  IProps,
} from 'src/lib/utils/applyPaddingMargin';

/**
 * Return the margin props as an object
 */
export const applyMarginObj = (props: number | IProps): IObj => {
  const result = applyPaddingMargin('margin')(props, true);

  if (typeof result === 'object') return result;

  return {};
};

export default (props: number | IProps): string => {
  const result = applyPaddingMargin('margin')(props, false);

  if (typeof result === 'string') return result;

  return '';
};
