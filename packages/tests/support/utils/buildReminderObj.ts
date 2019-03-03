const buildReminderObj = (count: number, isRedux: boolean, status?: string) => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const timeDiff = i * 1000;
    const now = new Date().getTime() - timeDiff;
    const dueDate = new Date(now);

    if (status === 'snoozed') {
      dueDate.setDate(dueDate.getDate() + 1);
    }

    const id = `id-${isRedux ? 'redux' : 'api'}-${i}`;

    reminderObj[id] = {
      dateCreated: now,
      dateModified: now,
      dueDate: dueDate.getTime(),
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
