import login, {
  IJSState as LoginJSState,
  IState as LoginState,
} from './login/reducer';
import reminders, {
  IJSState as ReminderJSState,
  IState as ReminderState,
  transform as reminderTransform,
} from './reminders/reducer';
import repeats, {
  IJSState as RepeatsJSState,
  IState as RepeatsState,
} from './repeats/reducer';
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
  repeats: RepeatsState;
  user: UserState;
  sync: SyncState;
}

export interface IJSState {
  login: LoginJSState;
  reminders: ReminderJSState;
  repeats: RepeatsJSState;
  user: UserJSState;
  sync: SyncJSState;
}

export type ReducerKey = keyof IState;

export const transforms = [reminderTransform];

export default {
  login,
  reminders,
  repeats,
  sync,
  user,
};
