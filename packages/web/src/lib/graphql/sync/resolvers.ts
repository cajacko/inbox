import * as admin from 'firebase-admin';
import { getReminders, setReminder } from '../reminder/resolvers';
import { IApiReminder } from '../types';

export const Query = {};

// TODO: Batch update
export const Mutation = {
  sync: (
    { reminders }: { reminders: IApiReminder[] },
    db: admin.firestore.DocumentReference
  ) =>
    Promise.all(reminders.map(reminder => setReminder(reminder, db)))
      .then(() => getReminders(db))
      .then(data => ({
        reminders: data,
      })),
};
