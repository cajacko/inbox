import moment from 'moment';
import AppError from 'src/lib/modules/AppError';
import withCache from 'src/lib/utils/withCache';
import { ensureDate } from './utils';

export const formats = {
  fullDate: (date: Date) => moment(date).format('ddd MMM Do YYYY'),
  monthYear: (date: Date) => moment(date).format('MMMM YYYY'),
};

type Format = keyof typeof formats;

/**
 * Format the date with the given type
 */
const format = (type: Format, date: Date, errorVal: any) => {
  if (!type) throw new AppError('No date format given', '100-003');

  let actualDate;

  try {
    actualDate = ensureDate(date);
  } catch (e) {
    if (errorVal === undefined) {
      throw e;
    }

    return errorVal;
  }

  const func = formats[type];

  if (!func) {
    throw new AppError(
      `Date format function does not exist: ${String(type)}`,
      '100-003'
    );
  }

  return func(actualDate);
};

/**
 * Generate the cache key for the format func
 */
const cacheKeyFunc = (type: Format, date: Date) => {
  let actualDate;

  try {
    actualDate = ensureDate(date);
  } catch (e) {
    return null;
  }

  return `${type}-${actualDate.getTime()}`;
};

export default withCache(format, undefined, cacheKeyFunc);
