const buildReminderObj = (
  count: number,
  isRedux: boolean,
  statusParam?: string
) => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const timeDiff = i * 1000;
    const now = new Date().getTime() - timeDiff;
    const dueDate = new Date(now);
    let status = 'INBOX';

    switch (statusParam) {
      case 'snoozed':
        dueDate.setDate(dueDate.getDate() + 1);
        break;
      case 'done':
        status = 'DONE';
        break;
      default:
        break;
    }

    const id = `id-${isRedux ? 'redux' : 'api'}-${i}`;

    reminderObj[id] = {
      dateCreated: now,
      dateModified: now,
      dueDate: dueDate.getTime(),
      id,
      status,
      text: `Reminder - ${i}`,
    };

    if (isRedux) {
      reminderObj[id].saveStatus = 'saving';
    }
  }

  return reminderObj;
};

export default buildReminderObj;
