import {
  IBuildReminderListsAction,
  ISetReminderAction,
  ISetRemindersAction,
  IUpdateReminderTimingsAction,
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
  | ISetReminderAction
  | ISyncRequestedAction
  | ISyncSuccessAction
  | ISyncFailedAction
  | ISetRemindersAction
  | IUpdateReminderTimingsAction
  | IBuildReminderListsAction;

export type PostActions =
  | IAction<ILoginPayload>
  | IAction<ILogoutPayload>
  | IAction<ISetReminderAction>
  | IAction<ISyncRequestedAction>
  | IAction<ISyncSuccessAction>
  | IAction<ISyncFailedAction>
  | IAction<ISetRemindersAction>
  | IAction<IUpdateReminderTimingsAction>
  | IAction<IBuildReminderListsAction>;
