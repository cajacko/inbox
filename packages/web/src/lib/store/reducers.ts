import login from './login/reducer';
import reminders from './reminders/reducer';
import sync from './sync/reducer';
import { IState } from './types';
import user from './user/reducer';

const reducer: { [key in keyof IState]: any } = {
  login,
  reminders,
  sync,
  user,
};

export { IState };

export type ReducerKey = keyof IState;

export const transforms = [];

export default reducer;
