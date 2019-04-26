import { IReminder } from '../store/types';

export interface IApiReminder {
  dateCreated: IReminder['dateCreated'];
  dateModified: IReminder['dateModified'];
  deletedDate: IReminder['deletedDate'];
  doneDate: IReminder['doneDate'];
  id: IReminder['id'];
  inboxDate: IReminder['inboxDate'];
  repeated: IReminder['repeated'];
  snoozedDate: IReminder['snoozedDate'];
  text: IReminder['text'];
  dueDate?: number; // Depreciated
  status?: string; // Depreciated
}
