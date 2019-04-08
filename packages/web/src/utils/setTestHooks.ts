import { Action } from 'redux';
import store from 'src/lib/utils/store';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    dispatch: (action: Action) => void;
  }
}

if (isTestEnv()) {
  window.dispatch = (action: Action) => store.dispatch(action);
}
