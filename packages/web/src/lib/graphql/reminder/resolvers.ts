interface IReminder {
  dateCreated: number;
  dateModified: number;
  id: string;
  text: string;
}

/**
 * Validate the given date
 */
const validateDate = (time: number, error: string) => {
  const date = new Date(time);
  const testDate = new Date(2018, 0, 1);

  if (date < testDate) throw new Error(error || 'Date failed validation');
};

export const Query = {
  getReminders: () => [],
};

export const Mutation = {
  setReminder: ({
    id, text, dateModified, dateCreated,
  }: IReminder) => {
    try {
      validateDate(dateCreated, 'Date created is not a valid date');
      validateDate(dateModified, 'Date modified is not a valid date');
    } catch (e) {
      return { error: e.message };
    }

    return { error: 'Success' };
  },
};
