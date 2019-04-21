import { AnyAction, Dispatch, Reducer, StoreEnhancer } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';

/**
 * Ensure the key is an int
 */
const processKey = (key: any): number => {
  const int = parseInt(key, 10);

  if (Number.isNaN(int)) {
    throw new Error('redux-persist-migrate: migrations must be keyed with integer values');
  }

  return int;
};

interface IState {
  [key: string]: any;
}

interface IManifest {
  [key: number]: (state: any) => any;
}

type VersionSelector = (state: IState) => string;
type VersionSetter = (state: IState, version: number) => IState;
export type OnMigrate = ({
  incomingState,
  migratedState,
  incomingVersion,
  currentVersion,
}: {
  incomingState: IState;
  migratedState: IState;
  incomingVersion: number | null;
  currentVersion: number;
}) => void;

type MiddleWare = (next: Dispatch<AnyAction>) => (action: AnyAction) => void;

type Next = (
  reducer: Reducer,
  initialState: IState,
  enhancer: StoreEnhancer
) => any;

/**
 * Create the migration middleware
 */
export default function createMigration(
  manifest: IManifest,
  customVersionSelector: string | VersionSelector,
  customVersionSetter?: VersionSetter,
  onMigrate?: OnMigrate,
  versionOverride?: number
) {
  let versionSelector: VersionSelector;
  let versionSetter: VersionSetter;

  if (typeof customVersionSelector === 'string') {
    const reducerKey = customVersionSelector;

    versionSelector = state =>
      state && state[reducerKey] && state[reducerKey].version;

    versionSetter = (state, version) => {
      const newState = Object.assign({}, state);

      if (['undefined', 'object'].indexOf(typeof newState[reducerKey]) === -1) {
        throw new Error('redux-persist-migrate: state for versionSetter key must be an object or undefined');
        // The original func just logged the error and returned the following:
        // return newState;
      }

      newState[reducerKey] = newState[reducerKey] || {};
      newState[reducerKey].version = version;
      return newState;
    };
  } else {
    versionSelector = customVersionSelector;

    if (!customVersionSetter) throw new Error('Oh no');

    versionSetter = customVersionSetter;
  }

  const versionKeys = Object.keys(manifest)
    .map(processKey)
    // eslint-disable-next-line id-length
    .sort((a, b) => a - b);

  /**
   * Get the current version we're on
   */
  const getCurrentVersion = () => {
    if (versionOverride) {
      if (versionOverride === -1) return versionOverride;
      if (versionKeys[versionOverride]) return versionKeys[versionOverride];
    }

    const lastVersion = versionKeys[versionKeys.length - 1];
    if (lastVersion && lastVersion !== 0) return lastVersion;

    return -1;
  };

  const currentVersion = getCurrentVersion();

  /**
   * Actually migrate from 1 state to another
   */
  const migrate = (state: IState, version: number | null) => {
    let newState = Object.assign({}, state);

    versionKeys
      // eslint-disable-next-line id-length
      .filter(v => version === null || v > version)
      // eslint-disable-next-line id-length
      .forEach((v) => {
        newState = manifest[v](newState);
      });

    newState = versionSetter(newState, currentVersion);

    return newState;
  };

  /**
   * Middleware func to handle the migration
   */
  const migrationDispatch: MiddleWare = next => (action) => {
    const newAction = Object.assign({}, action);

    let postMigrate;

    if (newAction.type === REHYDRATE) {
      const incomingState = newAction.payload;
      let incomingVersion: number | null = parseInt(
        versionSelector(incomingState),
        10
      );

      if (Number.isNaN(incomingVersion)) incomingVersion = null;

      if (incomingVersion !== currentVersion) {
        const migratedState = migrate(incomingState, incomingVersion);
        newAction.payload = migratedState;

        if (onMigrate) {
          postMigrate = () =>
            onMigrate({
              currentVersion,
              incomingState,
              incomingVersion,
              migratedState,
            });
        }
      }
    }

    const res = next(newAction);

    if (postMigrate) {
      postMigrate();
    }

    return res;
  };

  /**
   * The actual middleware, replaces the dispatch with our middleware one above
   * so we can hijack the persist action
   */
  return (next: Next) => (
    reducer: Reducer,
    initialState: IState,
    enhancer: StoreEnhancer
  ) => {
    const store = next(reducer, initialState, enhancer);

    return {
      ...store,
      dispatch: migrationDispatch(store.dispatch),
    };
  };
}
