import CustomDate from 'src/lib/modules/CustomDate';
import { Repeated } from 'src/lib/store/reminders/types';

/**
 * Get the next occurrence of a repeated reminder
 */
const getNextOccurrence = (repeat: Repeated, time: number): number => {
  let getDate: (date: CustomDate) => void;

  switch (repeat.type) {
    case 'DAILY':
      getDate = (date) => {
        date.setDate(date.getDate() + 1);
      };
      break;

    case 'WEEKLY':
      getDate = (date) => {
        date.setDate(date.getDate() + 7);
      };
      break;

    case 'MONTHLY':
      getDate = (date) => {
        date.setMonth(date.getMonth() + 1);
      };
      break;

    case 'YEARLY':
      getDate = (date) => {
        date.setFullYear(date.getFullYear() + 1);
      };
      break;
    default:
      throw new Error('Boo');
  }

  const nextOccurrence = new CustomDate(repeat.startDate);

  while (nextOccurrence.getTime() < time) {
    getDate(nextOccurrence);
  }

  return nextOccurrence.getTime();
};

export default getNextOccurrence;
