import makeActionCreator from 'src/lib/utils/makeActionCreator';

const SYNC_REQUESTED = 'SYNC_REQUESTED';
const SYNC_SUCCESS = 'SYNC_SUCCESS';
const SYNC_FAILED = 'SYNC_FAILED';

export const syncRequested = makeActionCreator(
  SYNC_REQUESTED,
  'changedReminders',
  'dateSyncRequested'
);

export const syncSuccess = makeActionCreator(
  SYNC_SUCCESS,
  'changedReminders',
  'dateSyncRequested',
  'newItems'
);

export const syncFailed = makeActionCreator(
  SYNC_FAILED,
  'changedReminders',
  'dateSyncRequested',
  'error'
);
