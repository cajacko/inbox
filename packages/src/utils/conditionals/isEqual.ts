import _isEqual from 'lodash/isEqual';
import { isDate } from 'src/lib/utils/dates';

/**
 * Check 2 values contain the same values
 */
const isEqual = (valA: any, valB: any) => {
  if (typeof valA !== typeof valB) return false;

  if (typeof valA === 'object') {
    if (isDate(valA)) {
      if (!isDate(valB)) return false;

      return valA.getTime() === valB.getTime();
    }
  }

  return _isEqual(valA, valB);
};

export default isEqual;
