const buildReminderObj = (count: number) => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const now = new Date().getTime();
    const id = `id-${i}`;

    reminderObj[id] = {
      dateCreated: now,
      dateModified: now,
      deleted: false,
      id,
      status: 'saving',
      text: `Reminder - ${i}`,
    };
  }

  return reminderObj;
};

export default buildReminderObj;
