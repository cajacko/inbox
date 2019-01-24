import user, {
  IJSState as UserJSState,
  IState as UserState,
} from './user/reducer';

export interface IState {
  user: UserState;
}

export interface IJSState {
  user: UserJSState;
}

export default {
  user,
};
