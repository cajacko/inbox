export const types = `
  scalar ReminderID
  scalar Date

  type Reminder {
    id: ReminderID!
    text: String!
    dateCreated: Date!
    dateModified: Date!
    dueDate: Date!
    status: String!
  }

  input ReminderInput {
    id: ReminderID!
    text: String!
    dateCreated: Date
    dateModified: Date!
    dueDate: Date!
    status: String!
  }
`;

export const query = `
  getReminders: [Reminder]!
`;

export const mutation = '';
