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

  input ReminderInput {
    id: ReminderID!
    text: String!
    dateCreated: Date
    dateModified: Date!
    deleted: Boolean!
  }
`;

export const query = `
  getReminders: [Reminder]!
`;

export const mutation = '';
