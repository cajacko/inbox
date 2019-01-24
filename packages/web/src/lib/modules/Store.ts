import cloneDeep from 'lodash/cloneDeep';
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  DeepPartial,
  ReducersMapObject,
  Store as IStore,
} from 'redux';
import {
  autoRehydrate,
  persistStore,
  Storage as IStorage,
} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import { IJSState, IState } from 'src/lib/store/reducers';
import isDev from 'src/utils/conditionals/isDev';
import logger from 'src/utils/logger';

const defaultOptions = {
  purgeOnLoad: false,
  shouldLogState: false,
};

type ExistingState = DeepPartial<IState>;

/**
 * Manage the redux store in 1 location
 */
class Store {
  private onFinishedStoreSetup: Promise<any>;
  private onFinishedPersist: Promise<any>;
  private store: IStore;
  private shouldLogState: boolean;
  private purgeOnLoad: boolean;

  /**
   * Initialise the class, setting up promises to check if we've
   * finished setting up the store
   */
  constructor(
    reducers: ReducersMapObject = {},
    existingState?: ExistingState,
    {
      shouldLogState,
      purgeOnLoad,
    }: { shouldLogState?: boolean; purgeOnLoad?: boolean } = defaultOptions
  ) {
    this.shouldLogState = !!shouldLogState;
    this.purgeOnLoad = !!purgeOnLoad;

    // Needs to be bound before any calls to this.setupStore, as that tries to
    // puts it's own binding on it
    this.loggerMiddleware = this.loggerMiddleware.bind(this);

    this.onFinishedStoreSetup = this.setupStore(reducers, existingState);
    this.onFinishedPersist = Promise.resolve();
  }

  /**
   * Initialise the store
   */
  private setupStore(
    reducers: ReducersMapObject,
    existingState?: ExistingState
  ) {
    const middleware = isDev()
      ? applyMiddleware(this.loggerMiddleware, thunk)
      : applyMiddleware(thunk);

    this.store = createStore(
      combineReducers(reducers),
      existingState,
      compose(
        middleware,
        autoRehydrate()
      )
    );

    return Promise.resolve();
  }

  /**
   * Persist the store, and set the promise for when it finishes
   */
  public persistStore(Storage: IStorage, blacklist: string[] = []) {
    if (!this.store) throw new Error('Store is not setup');

    this.onFinishedPersist = new Promise((resolve) => {
      const persistor = persistStore(
        this.store,
        {
          blacklist,
          storage: Storage,
          transforms: [immutableTransform()],
        },
        resolve
      );

      if (this.purgeOnLoad) persistor.purge();
    });

    return this.onFinishedPersist;
  }

  /**
   * Returns a promise that resolves when all the store setup has been completed
   */
  public onFinishedSetup() {
    return Promise.all([this.onFinishedStoreSetup, this.onFinishedPersist]);
  }

  /**
   * Get the state as a JS object, converting any immutable structures found
   * on the reducer roots
   */
  public getJSState(): IJSState {
    const state = this.getState();

    const newState = cloneDeep(state);

    Object.keys(state).forEach((key) => {
      const val = state[key];

      if (val && typeof val.toJS === 'function') {
        newState[key] = val.toJS();
      } else {
        newState[key] = val;
      }
    });

    return newState;
  }

  /**
   * Log in dev mode
   */
  private loggerMiddleware() {
    return (next: (action: Action) => void) => (action: Action) => {
      if (this.shouldLogState) logger.debug('REDUX BEFORE', this.getJSState());

      logger.debug(`REDUX ACTION: ${action.type}`, action);
      const res = next(action);

      if (this.shouldLogState) logger.debug('REDUX AFTER', this.getJSState());

      return res;
    };
  }

  /**
   * Get the state
   */
  public getState() {
    if (!this.store) throw new Error('Store is not setup');

    return this.store.getState();
  }

  /**
   * Dispatch an action
   */
  public dispatch(action: Action) {
    if (!this.store) throw new Error('Store is not setup');

    return this.store.dispatch(action);
  }

  /**
   * Get the entire store object
   */
  public get() {
    return this.store;
  }
}

export default Store;
