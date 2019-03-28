/* eslint @miovision/disallow-date/no-static-date: 0 */
/* eslint @miovision/disallow-date/no-new-date: 0 */
import { IDb } from '../../../types/general';
import { IApiReminder } from '../types';

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
export const setReminder = (reminder: IApiReminder, db: IDb) => {
  try {
    validateDate(reminder.dateCreated, 'Date created is not a valid date');
    validateDate(reminder.dateModified, 'Date modified is not a valid date');
    validateDate(reminder.dueDate, 'Due date is not a valid date');
  } catch (e) {
    return Promise.reject(e);
  }

  const location = `reminders/${reminder.id}`;

  // If the doc exists then update the record, as we won't have fields like
  // dateCreated in the payload, otherwise create as new
  return db
    .get(location)
    .then((data) => {
      if (data) {
        return { ...data, ...reminder };
      }

      const now = Date.now();

      return reminder.dateCreated
        ? reminder
        : // ensuring we always have a created date and due date, shouldn't happen though
        { dateCreated: now, dueDate: now, ...reminder };
    })
    .then(data => db.set(location, data));
};

/**
 * Get all the users reminders
 */
export const getReminders = (db: IDb) =>
  db.get('reminders').then((reminders?: { [key: string]: IApiReminder }) => {
    if (!reminders) return [];

    return Object.values(reminders)
      .sort((reminderA, reminderB) => reminderA.dueDate - reminderB.dueDate)
      .map(reminder => ({
        // Backup in case we have old data with no dueDate
        dueDate: reminder.dateCreated,
        ...reminder,
      }));
  });

export const Query = {
  getReminders: (vars: any, db: IDb) => getReminders(db),
};

export const Mutation = {};
