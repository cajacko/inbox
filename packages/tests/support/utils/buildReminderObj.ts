import { IApiReminder } from '../../lib/graphql/types';
import { IReminder, IState } from '../../lib/store/types/index';

const getSharedReminder = (
  i: number,
  idPartial: string,
  statusParam?: string
) => {
  const timeDiff = i * 1000;
  const now = new Date().getTime() - timeDiff;

  const id = `id-${idPartial}-${i}`;

  let snoozedDate = null;
  let doneDate = null;
  let inboxDate = null;

  const dueDate = new Date(now);

  switch (statusParam) {
    case 'snoozed':
      dueDate.setDate(dueDate.getDate() + 1);
      snoozedDate = dueDate.getTime();
      break;
    case 'done':
      doneDate = dueDate.getTime();
      break;
    default:
      inboxDate = dueDate.getTime();
      break;
  }

  const reminder = {
    dateCreated: now,
    dateModified: now,
    deletedDate: null,
    doneDate,
    id,
    inboxDate,
    repeated: null,
    snoozedDate,
    text: `Reminder - ${i}`,
  };

  return reminder;
};

export const redux = (
  count: number,
  statusParam?: string
): IState['reminders']['remindersById'] => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const reminder: IReminder = {
      ...getSharedReminder(i, 'redux'),
      saveStatus: 'saving',
    };

    reminderObj[reminder.id] = reminder;
  }

  return reminderObj;
};

export const api = (
  count: number,
  statusParam?: string
): { [key: string]: IApiReminder } => {
  const reminderObj = {};

  for (let i = 1; i < count + 1; i += 1) {
    const reminder: IApiReminder = getSharedReminder(i, 'api');

    reminderObj[reminder.id] = getSharedReminder(i, 'api');
  }

  return reminderObj;
};
