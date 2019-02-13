export const types = `
  scalar ReminderID
  scalar Date

  type Reminder {
    id: ReminderID!
    text: String!
    dateCreated: Date!
    dateModified: Date!
  }

  type ReminderResponse {
    error: String
    reminder: Reminder
  }
`;

export const query = `
  getReminders: [Reminder]!
`;

export const mutation = `
  setReminder(id: ReminderID!, text: String!, dateCreated: Date, dateModified: Date!): ReminderResponse
`;
