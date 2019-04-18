import { IReminder } from '../store/reminders/types';

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
}
