export interface IApiReminder {
  dateCreated: number;
  dateModified: number;
  id: string;
  text: string;
  status: 'DONE' | 'DELETED' | 'INBOX';
}
