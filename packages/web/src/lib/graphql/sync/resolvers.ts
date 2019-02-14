import * as admin from 'firebase-admin';
import { getReminders, IReminder, setReminder } from '../reminder/resolvers';

export const Query = {};

// TODO: Batch update
export const Mutation = {
  sync: (
    { reminders }: { reminders: IReminder[] },
    db: admin.firestore.DocumentReference
  ) =>
    Promise.all(reminders.map(reminder => setReminder(reminder, db)))
      .then(() => getReminders(db))
      .then(data => ({
        reminders: data,
      })),
};
