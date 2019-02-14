const buildReminderObj = (count: number, isRedux: boolean) => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const now = new Date().getTime();
    const id = `id-${i}`;

    reminderObj[id] = {
      dateCreated: now,
      dateModified: now,
      deleted: false,
      id,
      text: `Reminder - ${i}`,
    };

    if (isRedux) {
      reminderObj[id].status = 'saving';
    }
  }

  return reminderObj;
};

export default buildReminderObj;
