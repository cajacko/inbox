import { Action } from 'redux';
import store from 'src/lib/utils/store';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    idToken: () => string | null;
    dispatch: (action: Action) => void;
  }
}

if (isTestEnv()) {
  window.idToken = () => store.getState().user.idToken;

  window.dispatch = (action: Action) => store.dispatch(action);
}
