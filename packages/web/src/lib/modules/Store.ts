/* eslint max-lines: 0 */
import cloneDeep from 'lodash/cloneDeep';
import * as redux from 'redux';
import * as reduxPersist from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import { PreActions } from 'src/lib/store/actions';
import { IState, ReducerKey } from 'src/lib/store/reducers';
import { Middleware } from 'src/lib/types/libs';
import getEnvVar from 'src/lib/utils/getEnvVar';
import createMigration, { OnMigrate } from 'src/lib/utils/middleware/createMigration';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import logger from 'src/utils/logger';

const defaultOptions = {
  purgeOnLoad: false,
  shouldLogState: false,
};

type ExistingState = redux.DeepPartial<IState>;

type RootReducer = (
  reducer: redux.Reducer<any, redux.AnyAction>
) => (state: any, action: redux.AnyAction) => IState;

interface IMigrations {
  [key: number]: (state: any) => any;
}

/**
 * Manage the redux store in 1 location
 */
class Store {
  private onFinishedStoreSetup: Promise<any>;
  private onFinishedPersist: Promise<any>;
  private store: redux.Store;
  private shouldLogState: boolean;
  private purgeOnLoad: boolean;
  private persistor: reduxPersist.Persistor | null = null;
  private onMigrate?: OnMigrate;

  /**
   * Initialise the class, setting up promises to check if we've
   * finished setting up the store
   */
  constructor(
    reducers: redux.ReducersMapObject = {},
    existingState?: ExistingState,
    {
      shouldLogState,
      purgeOnLoad,
      middleware,
      migrations,
      rootReducer,
      onMigrate,
    }: {
    shouldLogState?: boolean;
    purgeOnLoad?: boolean;
    middleware?: Middleware[];
    migrations?: IMigrations;
    rootReducer?: RootReducer;
    onMigrate?: OnMigrate;
    } = defaultOptions
  ) {
    this.shouldLogState = !!shouldLogState;
    this.purgeOnLoad = !!purgeOnLoad;
    this.onMigrate = onMigrate;

    // Needs to be bound before any calls to this.setupStore, as that tries to
    // puts it's own binding on it
    this.loggerMiddleware = this.loggerMiddleware.bind(this);

    this.onFinishedStoreSetup = this.setupStore(
      reducers,
      existingState,
      middleware,
      rootReducer,
      migrations
    );
    this.onFinishedPersist = Promise.resolve();
  }

  /**
   * Initialise the store
   */
  private setupStore(
    reducers: redux.ReducersMapObject,
    existingState?: ExistingState,
    middleware: Middleware[] = [],
    rootReducer?: RootReducer,
    manifest: IMigrations = {}
  ) {
    const logTest = getEnvVar('LOG_REDUX_IN_TESTS') || !isTestEnv();

    const shouldLog = isDev() && logTest;

    const allMiddleware = shouldLog
      ? redux.applyMiddleware(this.loggerMiddleware, thunk, ...middleware)
      : redux.applyMiddleware(thunk, ...middleware);

    // VERSION_REDUCER_KEY is the key of the reducer you want to store the state
    // version in. You _must_ create this reducer, redux-persist-migrate will
    // not create it for you.
    const VERSION_REDUCER_KEY = '_version';

    const reducer: redux.Reducer<any, redux.AnyAction> = redux.combineReducers({
      ...reducers,
      [VERSION_REDUCER_KEY]: (state: any = {}) => state,
    });

    const migration = createMigration(
      manifest,
      VERSION_REDUCER_KEY,
      undefined,
      this.onMigrate
    );

    this.store = redux.createStore(
      rootReducer ? rootReducer(reducer) : reducer,
      existingState,
      redux.compose(
        allMiddleware,
        migration,
        reduxPersist.autoRehydrate()
      )
    );

    return Promise.resolve();
  }

  /**
   * Persist the store, and set the promise for when it finishes
   */
  public persistStore(
    Storage: reduxPersist.Storage,
    blacklist: ReducerKey[] = [],
    transforms: Array<reduxPersist.Transform<any, any>> = []
  ) {
    if (!this.store) throw new Error('Store is not setup');

    this.onFinishedPersist = new Promise((resolve) => {
      this.persistor = reduxPersist.persistStore(
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
  public getJSState(): IState {
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
    return (next: (action: PreActions) => any) => (action: PreActions) => {
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
  public dispatch(action: redux.Action) {
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
