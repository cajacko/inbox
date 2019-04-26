import { IApiReminder } from 'src/lib/graphql/types';

/**
 * Set a reminder
 */
export const sync = ({
  reminders,
  dateSyncRequested,
}: {
  dateSyncRequested: number;
  reminders: IApiReminder[];
  }) => ({
  mutation: `
    mutation Sync($reminders: [ReminderInput]!, $dateSyncRequested: Date!) {
      sync(reminders: $reminders, dateSyncRequested: $dateSyncRequested) {
        error
        reminders {
          dateCreated
          dateModified
          doneDate
          deletedDate
          inboxDate
          snoozedDate
          repeated
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
