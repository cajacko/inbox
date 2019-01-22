import moment from 'moment';

/**
 * Is the given value a date object
 */
export const isDate = (date: any) => moment(date).isValid();

/**
 * Is the month and year different between 2 dates
 */
export const isMonthYearDiff = (dateA: Date, dateB: Date) => {
  if (!dateA) return true;

  if (
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  ) {
    return false;
  }

  return true;
};
