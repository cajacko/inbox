import {
  IDeleteReminderAction,
  IRemoveReminderRepeatAction,
  ISetDueDateAction,
  ISetReminderAction,
  ISetReminderRepeatAction,
  IToggleReminderDoneAction,
} from 'src/lib/store/reminders/actions';
import {
  ISyncFailedAction,
  ISyncRequestedAction,
  ISyncSuccessAction,
} from 'src/lib/store/sync/actions';
import { ILoginPayload, ILogoutPayload } from 'src/lib/store/user/actions';

interface IActionTemplate {
  type: string;
  payload: object;
}

interface IAction<A extends IActionTemplate> {
  type: A['type'];
  payload: A['payload'];
  time: number;
  analytics?: {
    action?: string;
    category?: string;
    label?: string;
    value?: number;
    doNotSendEvent?: boolean;
  };
}

export type PreActions =
  | ILoginPayload
  | ILogoutPayload
  | IDeleteReminderAction
  | ISetReminderRepeatAction
  | ISetReminderAction
  | IToggleReminderDoneAction
  | ISetDueDateAction
  | ISyncRequestedAction
  | ISyncSuccessAction
  | ISyncFailedAction
  | IRemoveReminderRepeatAction;

export type PostActions =
  | IAction<ILoginPayload>
  | IAction<ILogoutPayload>
  | IAction<IDeleteReminderAction>
  | IAction<ISetReminderRepeatAction>
  | IAction<ISetReminderAction>
  | IAction<IToggleReminderDoneAction>
  | IAction<ISetDueDateAction>
  | IAction<ISyncRequestedAction>
  | IAction<ISyncSuccessAction>
  | IAction<ISyncFailedAction>
  | IAction<IRemoveReminderRepeatAction>;
