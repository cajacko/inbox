import { IDb } from '../../../types/general';
import { getReminders, setReminder } from '../reminder/resolvers';
import { IApiReminder } from '../types';

export const Query = {};

// TODO: Batch update
export const Mutation = {
  sync: ({ reminders }: { reminders: IApiReminder[] }, db: IDb) =>
    Promise.all(reminders.map(reminder => setReminder(reminder, db)))
      .then(() => getReminders(db))
      .then(data => ({
        reminders: data,
      })),
};
