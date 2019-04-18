import login, {
  IJSState as LoginJSState,
  IState as LoginState,
} from './login/reducer';
import reminders from './reminders/reducer';
import {
  IJSState as ReminderJSState,
  IState as ReminderState,
} from './reminders/types';
import sync, {
  IJSState as SyncJSState,
  IState as SyncState,
} from './sync/reducer';
import user, {
  IJSState as UserJSState,
  IState as UserState,
} from './user/reducer';

export interface IState {
  login: LoginState;
  reminders: ReminderState;
  user: UserState;
  sync: SyncState;
}

export interface IJSState {
  login: LoginJSState;
  reminders: ReminderJSState;
  user: UserJSState;
  sync: SyncJSState;
}

export type ReducerKey = keyof IState;

export const transforms = [];

export default {
  login,
  reminders,
  sync,
  user,
};
