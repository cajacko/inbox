interface IReminder {
  dateCreated: number;
  dateModified: number;
  id: string;
  text: string;
}

/**
 * Set a reminder
 */
export const sync = ({
  reminders,
  dateSyncRequested,
}: {
  dateSyncRequested: number;
  reminders: IReminder[];
  }) => ({
  mutation: `
    mutation Sync($reminders: [ReminderInput]!, $dateSyncRequested: Date!) {
      sync(reminders: $reminders, dateSyncRequested: $dateSyncRequested) {
        error
        reminders {
          dateCreated
          dateModified
          id
          text
        }
      }
    }
  `,
  vars: {
    dateSyncRequested,
    reminders,
  },
});
