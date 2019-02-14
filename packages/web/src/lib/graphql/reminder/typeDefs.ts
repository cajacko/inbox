export const types = `
  scalar ReminderID
  scalar Date

  type Reminder {
    id: ReminderID!
    text: String!
    dateCreated: Date!
    dateModified: Date!
    deleted: Boolean!
  }

  type ReminderResponse {
    error: String
    reminder: Reminder
  }

  input ReminderInput {
    id: ReminderID!
    text: String!
    dateCreated: Date!
    dateModified: Date!
    deleted: Boolean!
  }
`;

export const query = `
  getReminders: [Reminder]!
`;

export const mutation = `
  setReminder(id: ReminderID!, text: String!, dateCreated: Date, dateModified: Date!, deleted: Boolean!): ReminderResponse
`;
