import moment from 'moment';
import { ensureDate } from './utils';

/**
 * Get the week day name, Monday, tuesday etc.
 */
export const getWeekDayName = (date: Date) =>
  moment(ensureDate(date)).format('dddd');

/**
 * Get the day of the month
 */
export const getDate = (date: Date) => ensureDate(date).getDate();
