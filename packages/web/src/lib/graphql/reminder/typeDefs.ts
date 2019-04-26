export const types = `
  scalar ReminderID
  scalar Date

  type Reminder {
    dateCreated: Date!
    dateModified: Date!
    deletedDate: Date
    doneDate: Date
    id: ReminderID!
    inboxDate: Date
    repeated: Date
    snoozedDate: Date
    text: String!

    # Depreciated
    dueDate: Date
    status: String
  }

  input ReminderInput {
    dateCreated: Date
    dateModified: Date!
    deletedDate: Date
    doneDate: Date
    id: ReminderID!
    inboxDate: Date
    repeated: Date
    snoozedDate: Date
    text: String!

    # Depreciated
    dueDate: Date
    status: String
  }
`;

export const query = `
  getReminders: [Reminder]!
`;

export const mutation = '';
