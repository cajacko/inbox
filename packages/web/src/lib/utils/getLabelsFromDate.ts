import CustomDate from 'src/lib/modules/CustomDate';
import { format } from 'src/lib/utils/dates';

/**
 * Get all the labels associated with a given date
 */
const getLabelsFromDate = (date: CustomDate) => ({
  date: format('dayDate', date),
  time: format('time', date),
  timeLabel: 'Suggestions.Time.Evening',
});

export default getLabelsFromDate;
