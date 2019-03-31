import CustomDate from 'src/lib/modules/CustomDate';
import { format } from 'src/lib/utils/dates';
import { suggestedTimes } from 'src/lib/utils/getSnoozeSuggestions';

/**
 * Get all the labels associated with a given date
 */
const getLabelsFromDate = (date: CustomDate) => {
  let label = 'Suggestions.Time.Custom';

  /**
   * Set the time label
   */
  const setLabel = (time: typeof suggestedTimes.afternoon, text: string) => {
    const suggestionDate = time.getTime(date);

    if (suggestionDate.getHours() !== date.getHours()) return;
    if (suggestionDate.getMinutes() !== date.getMinutes()) return;

    label = text;
  };

  setLabel(suggestedTimes.morning, 'Suggestions.Time.Morning');
  setLabel(suggestedTimes.afternoon, 'Suggestions.Time.Afternoon');
  setLabel(suggestedTimes.evening, 'Suggestions.Time.Evening');

  return {
    date: format('dayDate', date),
    time: format('time', date),
    timeLabel: label,
  };
};

export default getLabelsFromDate;
