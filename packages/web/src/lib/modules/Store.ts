import cloneDeep from 'lodash/cloneDeep';
import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  DeepPartial,
  Reducer,
  ReducersMapObject,
  Store as IStore,
} from 'redux';
import {
  autoRehydrate,
  Persistor,
  persistStore,
  Storage as IStorage,
  Transform,
} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import { IJSState, IState, ReducerKey } from 'src/lib/store/reducers';
import { IAction, Middleware } from 'src/lib/types/libs';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import logger from 'src/utils/logger';

const defaultOptions = {
  purgeOnLoad: false,
  shouldLogState: false,
};

type ExistingState = DeepPartial<IState>;

type RootReducer = (
  reducer: Reducer<any, AnyAction>
) => (state: any, action: AnyAction) => IState;

/**
 * Manage the redux store in 1 location
 */
class Store {
  private onFinishedStoreSetup: Promise<any>;
  private onFinishedPersist: Promise<any>;
  private store: IStore;
  private shouldLogState: boolean;
  private purgeOnLoad: boolean;
  private persistor: Persistor | null = null;

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
      middleware,
      rootReducer,
    }: {
    shouldLogState?: boolean;
    purgeOnLoad?: boolean;
    middleware?: Middleware[];
    rootReducer?: RootReducer;
    } = defaultOptions
  ) {
    this.shouldLogState = !!shouldLogState;
    this.purgeOnLoad = !!purgeOnLoad;

    // Needs to be bound before any calls to this.setupStore, as that tries to
    // puts it's own binding on it
    this.loggerMiddleware = this.loggerMiddleware.bind(this);

    this.onFinishedStoreSetup = this.setupStore(
      reducers,
      existingState,
      middleware,
      rootReducer
    );
    this.onFinishedPersist = Promise.resolve();
  }

  /**
   * Initialise the store
   */
  private setupStore(
    reducers: ReducersMapObject,
    existingState?: ExistingState,
    middleware: Middleware[] = [],
    rootReducer?: RootReducer
  ) {
    const allMiddleware =
      isDev() && !isTestEnv()
        ? applyMiddleware(this.loggerMiddleware, thunk, ...middleware)
        : applyMiddleware(thunk, ...middleware);

    const reducer = combineReducers(reducers);

    this.store = createStore(
      rootReducer ? rootReducer(reducer) : reducer,
      existingState,
      compose(
        allMiddleware,
        autoRehydrate()
      )
    );

    return Promise.resolve();
  }

  /**
   * Persist the store, and set the promise for when it finishes
   */
  public persistStore(
    Storage: IStorage,
    blacklist: ReducerKey[] = [],
    transforms: Array<Transform<any, any>> = []
  ) {
    if (!this.store) throw new Error('Store is not setup');

    this.onFinishedPersist = new Promise((resolve) => {
      this.persistor = persistStore(
        this.store,
        {
          blacklist,
          storage: Storage,
          transforms: transforms.concat(immutableTransform()),
        },
        resolve
      );

      if (this.purgeOnLoad) this.persistor.purge();
    });

    return this.onFinishedPersist;
  }

  /**
   * Purge the persisted store
   */
  public purge() {
    if (this.persistor) this.persistor.purge();
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
    return (next: (action: IAction) => any) => (action: IAction) => {
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
  public getState(): IState {
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
