import applyPaddingMargin, {
  IObj,
  IProps,
} from 'src/lib/utils/applyPaddingMargin';

/**
 * Return the padding props as an object
 */
export const applyPaddingObj = (props: number | IProps): IObj => {
  const result = applyPaddingMargin('padding')(props, true);

  if (typeof result === 'object') return result;

  return {};
};

export default (props: number | IProps): string => {
  const result = applyPaddingMargin('padding')(props, false);

  if (typeof result === 'string') return result;

  return '';
};
