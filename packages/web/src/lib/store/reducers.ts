import reminders, {
  IJSState as ReminderJSState,
  IState as ReminderState,
} from './reminders/reducer';
import user, {
  IJSState as UserJSState,
  IState as UserState,
} from './user/reducer';

export interface IState {
  reminders: ReminderState;
  user: UserState;
}

export interface IJSState {
  reminders: ReminderJSState;
  user: UserJSState;
}

export type ReducerKey = keyof IState;

export default {
  reminders,
  user,
};
