export const types = `
  type SyncResponse {
    error: String
    reminders: [Reminder]
  }
`;

export const query = '';

export const mutation = `
  sync(reminders: [ReminderInput]!, dateSyncRequested: Date!): SyncResponse
`;
