import { IApiReminder } from 'src/lib/graphql/types';
import { PostActions } from 'src/lib/store/actions';
import { IReminder, IState } from 'src/lib/store/types';
import {
  addRemindersToLists,
  sortReminders,
  updateReminderTiming,
} from 'src/lib/utils/reminders';

const initialState: IState['reminders'] = {
  remindersById: {},
  remindersByList: {
    deleted: [],
    done: [],
    inbox: [],
    repeated: [],
    snoozed: [],
  },
};

/**
 * Set which reminders should be in which list and order them
 */
const setLists = (
  state: IState['reminders'],
  time: number
): IState['reminders'] => {
  const lists = addRemindersToLists(state);

  const orderedLists: IState['reminders']['remindersByList'] = Object.keys(lists).reduce(
    (acc, listKey: keyof IState['reminders']['remindersByList']) => ({
      ...acc,
      [listKey]: lists[listKey].sort((a: string, b: string) => {
        const reminderA = state.remindersById[a];
        const reminderB = state.remindersById[b];

        const order = sortReminders(reminderA, reminderB, time);

        switch (listKey) {
          case 'deleted':
            return order('deletedDate');
          case 'done':
            return order('doneDate');
          case 'inbox':
            return order('inboxDate');
          case 'repeated':
            return order('repeated');
          case 'snoozed':
            return order('snoozedDate');
          default:
            throw new Error('Boo');
        }
      }),
    }),
    lists
  );

  return {
    ...state,
    remindersByList: orderedLists,
  };
};

/**
 * Update any reminders dates based on whether their snoozed or repeated times
 * have come up
 */
const updateReminderTimings = (
  state: IState['reminders'],
  time: number
): IState['reminders'] => {
  const remindersById = Object.values(state.remindersById).reduce(
    (acc, reminder) => {
      if (!reminder) return acc;

      return {
        ...acc,
        [reminder.id]: updateReminderTiming(reminder, time),
      };
    },
    state.remindersById
  );

  return setLists({ ...state, remindersById }, time);
};

/**
 * Set a single reminder
 */
const setReminder = (
  state: IState['reminders'],
  reminder: IReminder,
  time: number,
  shouldSetLists: boolean
): IState['reminders'] => {
  let newState: IState['reminders'] = {
    ...state,
    remindersById: {
      ...state.remindersById,
      [reminder.id]: reminder,
    },
  };

  if (shouldSetLists) newState = setLists(newState, time);

  return updateReminderTimings(newState, time);
};

/**
 * Set multiple reminders
 */
const setReminders = (
  state: IState['reminders'],
  reminders: IReminder[],
  time: number
): IState['reminders'] => {
  const newState: IState['reminders'] = reminders.reduce(
    (acc, reminder) => setReminder(acc, reminder, time, false),
    state
  );

  return setLists(newState, time);
};

/**
 * Convert and api reminder to one for the state
 */
const covertReminder = (apiReminder: IApiReminder[]): IReminder[] =>
  apiReminder.map<IReminder>(reminder => ({
    ...reminder,
    saveStatus: 'saved',
  }));

/**
 * Reminders reducer
 */
const reducer = (
  state: IState['reminders'] = initialState,
  action: PostActions
): IState['reminders'] => {
  switch (action.type) {
    case 'SET_REMINDER':
      return setReminder(state, action.payload, action.time, true);
    case 'SET_REMINDERS':
      return setReminders(state, action.payload, action.time);
    case 'UPDATE_REMINDER_TIMINGS':
      return updateReminderTimings(state, action.time);
    case 'SYNC_SUCCESS':
      return setReminders(
        state,
        covertReminder(action.payload.newItems.reminders),
        action.time
      );
    case 'BUILD_REMINDER_LISTS':
      return updateReminderTimings(state, action.time);

    default:
      return state;
  }
};

export default reducer;
