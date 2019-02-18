import * as admin from 'firebase-admin';

export interface IReminder {
  dateCreated: number;
  dateModified: number;
  id: string;
  text: string;
  deleted: boolean;
}

/**
 * Validate the given date
 */
export const validateDate = (time: number, error: string) => {
  const date = new Date(time);
  const testDate = new Date(2018, 0, 1);

  if (date < testDate) throw new Error(error || 'Date failed validation');
};

// TODO: Batch
/**
 * Set an individual reminder
 */
export const setReminder = (
  reminder: IReminder,
  db: admin.firestore.DocumentReference
) => {
  try {
    validateDate(reminder.dateCreated, 'Date created is not a valid date');
    validateDate(reminder.dateModified, 'Date modified is not a valid date');
  } catch (e) {
    return Promise.reject(e);
  }

  const doc = db.collection('reminders').doc(reminder.id);

  // If the doc exists then update the record, as we won't have fields like
  // dateCreated in the payload, otherwise create as new
  return doc.get().then((data) => {
    if (data.exists) {
      return doc.update(reminder);
    }

    const finalReminder = reminder.dateCreated
      ? reminder
      : // ensuring we always have a created data, shouldn't happen though
      { ...reminder, dateCreated: new Date().getTime() };

    return doc.set(finalReminder);
  });
};

/**
 * Get all the users reminders
 */
export const getReminders = (db: admin.firestore.DocumentReference) =>
  db
    .collection('reminders')
    .orderBy('dateModified')
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return [];
      }

      const data: any = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();

        if (!docData) return;

        data.push({ deleted: false, ...docData });
      });

      return data;
    });

export const Query = {
  getReminders: (vars: any, db: admin.firestore.DocumentReference) =>
    getReminders(db),
};

export const Mutation = {};
