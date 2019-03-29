import Briefcase from 'src/lib/assets/icons/Briefcase';
import BusinessTime from 'src/lib/assets/icons/BusinessTime';
import Couch from 'src/lib/assets/icons/Couch';
import Moon from 'src/lib/assets/icons/Moon';
import Sun from 'src/lib/assets/icons/Sun';
import {
  ISuggestedTimes,
  ISuggestion,
} from 'src/lib/components/Snooze/Snooze.render';
import CustomDate from 'src/lib/modules/CustomDate';
import { format } from 'src/lib/utils/dates';

/**
 * Get the suggested time props
 */
const getSuggestedTime = (hour: number, minutes: number) => {
  return {
    getTime: (date: CustomDate) => {
      const time = new CustomDate(date);
      time.setHours(hour);
      time.setMinutes(minutes);
      return time;
    },
    hour,
    minutes,
  };
};

export const suggestedTimes = {
  afternoon: getSuggestedTime(12, 30),
  evening: getSuggestedTime(17, 30),
  morning: getSuggestedTime(6, 30),
};

type OnSelect = (date: CustomDate) => () => void;

/**
 * Get suggested dates
 */
export const getDates = (onSelect: OnSelect): ISuggestion[] => {
  const now = new CustomDate();

  const constructor: Array<{
    getDate: () => CustomDate;
    icon: ISuggestion['icon'];
    key: ISuggestion['key'];
    testID: ISuggestion['testID'];
    title: ISuggestion['title'];
    shouldShow: (date: CustomDate) => boolean;
    }> = [
      {
        getDate: () => {
          const date = new CustomDate();
          date.setHours(suggestedTimes.evening.hour);
          date.setMinutes(suggestedTimes.evening.minutes);
          return date;
        },
        icon: Moon,
        key: 'laterToday',
        shouldShow: date => date > now,
        testID: 'Suggestion--LaterToday',
        title: { _textFromConst: 'Later Today' },
      },
      {
        getDate: () => {
          const date = new CustomDate();
          date.setDate(date.getDate() + 1);
          date.setHours(suggestedTimes.morning.hour);
          date.setMinutes(suggestedTimes.morning.minutes);
          return date;
        },
        icon: Sun,
        key: 'tomorrow',
        shouldShow: () => true,
        testID: 'Suggestion--Tomorrow',
        title: { _textFromConst: 'Tomorrow' },
      },
      {
        getDate: () => {
          const date = new CustomDate();
          date.setHours(suggestedTimes.morning.hour);
          date.setMinutes(suggestedTimes.morning.minutes);
          date.setDate(date.getDate() + 2);

          const allowedDays = [3, 4, 5];

          while (!allowedDays.includes(date.getDay())) {
            date.setDate(date.getDate() + 1);
          }

          return date;
        },
        icon: Briefcase,
        key: 'laterThisWeek',
        shouldShow: () => [1, 2, 3].includes(now.getDay()),
        testID: 'Suggestion--LaterThisWeek',
        title: { _textFromConst: 'Later This Week' },
      },
      {
        getDate: () => {
          const date = new CustomDate();
          date.setHours(suggestedTimes.morning.hour);
          date.setMinutes(suggestedTimes.morning.minutes);
          date.setDate(date.getDate() + 2);

          while (date.getDay() !== 6) {
            date.setDate(date.getDate() + 1);
          }

          return date;
        },
        icon: Couch,
        key: 'thisWeekend',
        shouldShow: () => [1, 2, 3, 4].includes(now.getDay()),
        testID: 'Suggestion--ThisWeekend',
        title: { _textFromConst: 'This Weekend' },
      },
      {
        getDate: () => {
          const date = new CustomDate();
          date.setHours(suggestedTimes.morning.hour);
          date.setMinutes(suggestedTimes.morning.minutes);
          date.setDate(date.getDate() + 2);

          while (date.getDay() !== 1) {
            date.setDate(date.getDate() + 1);
          }

          return date;
        },
        icon: BusinessTime,
        key: 'nextWeek',
        shouldShow: () => now.getDay() !== 0,
        testID: 'Suggestion--NextWeek',
        title: { _textFromConst: 'Next Week' },
      },
      {
        getDate: () => {
          const date = new CustomDate();
          date.setHours(suggestedTimes.morning.hour);
          date.setMinutes(suggestedTimes.morning.minutes);
          date.setDate(date.getDate() + 2);

          while (date.getDay() !== 6) {
            date.setDate(date.getDate() + 1);
          }

          return date;
        },
        icon: Couch,
        key: 'nextWeekend',
        shouldShow: () => [0, 6].includes(now.getDay()),
        testID: 'Suggestion--NextWeekend',
        title: { _textFromConst: 'Next Weekend' },
      },
    ];

  const filtered = constructor
    .filter(({ shouldShow, getDate }) => shouldShow(getDate()))
    .sort((suggestionA, suggestionB) =>
      suggestionA.getDate().getTime() - suggestionB.getDate().getTime());

  return filtered.map((suggestion) => {
    const date = suggestion.getDate();

    return {
      action: onSelect(date),
      icon: suggestion.icon,
      key: suggestion.key,
      testID: suggestion.testID,
      text: { _textFromConst: format('dayTime', date) },
      title: suggestion.title,
    };
  });
};

/**
 * Get the suggested times
 */
export const getTimes = (
  date: CustomDate,
  onChangeTime: (date: CustomDate | null) => void,
  onCustomised: () => void
): ISuggestedTimes[] => {
  const suggestions = [
    {
      label: 'Morning',
      testID: 'TimeSuggestion--Morning',
      time: suggestedTimes.morning.getTime(date),
    },
    {
      label: 'Afternoon',
      testID: 'TimeSuggestion--Afternoon',
      time: suggestedTimes.afternoon.getTime(date),
    },
    {
      label: 'Evening',
      testID: 'TimeSuggestion--Evening',
      time: suggestedTimes.evening.getTime(date),
    },
    {
      label: 'Customised',
      testID: 'TimeSuggestion--Customised',
    },
  ];

  return suggestions.map(({ label, time, testID }) => ({
    label,
    onChangeTime: time
      ? () => {
        onChangeTime(time);
      }
      : onCustomised,
    testID,
    time: time ? format('time', time) : undefined,
  }));
};
