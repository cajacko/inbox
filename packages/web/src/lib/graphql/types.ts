export interface IApiReminder {
  dateCreated: number;
  dateModified: number;
  dueDate: number;
  id: string;
  text: string;
  status: 'DONE' | 'DELETED' | 'INBOX';
}
