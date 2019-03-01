import AppError from 'src/lib/modules/AppError';
import CustomDate from 'src/lib/modules/CustomDate';
import { isDate } from './conditionals';

/**
 * Ensure the value is a date
 */
export const ensureDate = (date: any, fallback?: any) => {
  const newDate = new CustomDate(date);

  if (!isDate(newDate)) {
    if (fallback) return fallback;

    throw new AppError(
      `Passed value is not a date object: ${String(date)}`,
      '100-003'
    );
  }

  return newDate;
};
