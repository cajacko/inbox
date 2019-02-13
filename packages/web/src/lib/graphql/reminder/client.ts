/**
 * Set a reminder
 */
export const setReminder = ({
  dateCreated,
  dateModified,
  id,
  text,
}: {
  dateCreated: number;
  dateModified: number;
  id: string;
  text: string;
  }) => ({
  mutation: `
    mutation SetReminder($id: ReminderID!, $text: String!, $dateCreated: Date!, $dateModified: Date!) {
      setReminder(id: $id, text: $text, dateCreated: $dateCreated, dateModified: $dateModified) {
        error
      }
    }
  `,
  vars: {
    dateCreated,
    dateModified,
    id,
    text,
  },
});
