const buildReminderObj = (count: number, isRedux: boolean) => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const now = new Date().getTime();
    const id = `id-${isRedux ? 'redux' : 'api'}-${i}`;

    reminderObj[id] = {
      dateCreated: now,
      dateModified: now,
      id,
      status: 'INBOX',
      text: `Reminder - ${i}`,
    };

    if (isRedux) {
      reminderObj[id].saveStatus = 'saving';
    }
  }

  return reminderObj;
};

export default buildReminderObj;
