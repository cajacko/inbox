import { IApiReminder } from 'src/lib/graphql/types';
import { IReminder } from 'src/lib/store/reminders/reducer';
import {
  syncFailed,
  syncRequested,
  syncSuccess,
} from 'src/lib/store/sync/actions';
import api from 'src/lib/utils/api';
import store from 'src/lib/utils/store';
import testHook from 'src/utils/testHook';
import testHookExists from 'src/utils/testHookExists';

let cron: any;
let currentSyncStatus: 'REQUESTED' | 'FINISHED' = 'FINISHED';
let syncWhenFinished = false;
let nextSyncPromise = Promise.resolve();
let resolveNextSync: (res: any) => void;
let rejectNextSync: (e: any) => void;

export type SyncType = 'cron' | 'action' | 'init' | 'queued' | 'manual';

/**
 * Set the next sync promise
 */
const setNextSyncPromise = () => {
  nextSyncPromise = new Promise((resolve, reject) => {
    resolveNextSync = resolve;
    rejectNextSync = reject;
  });
};

/**
 * Get all the reminders which have changed locally
 */
const getChangedReminders = (): IApiReminder[] => {
  const { reminders } = store.getState();

  const reminderArr: IReminder[] = Object.values(reminders);

  return reminderArr
    .filter(({ saveStatus }) => saveStatus !== 'saved')
    .map(reminder => ({
      dateCreated: reminder.dateCreated,
      dateModified: reminder.dateModified,
      id: reminder.id,
      status: reminder.status === 'SNOOZED' ? 'INBOX' : reminder.status,
      text: reminder.text,
    }));
};

/**
 * Is the user logged in
 */
const isLoggedIn = () => store.getState().user.isLoggedIn;

/**
 * Run the sync action
 */
const sync = (type: SyncType) => {
  syncWhenFinished = false;

  if (!isLoggedIn()) return Promise.resolve();

  currentSyncStatus = 'REQUESTED';

  try {
    const changedReminders = getChangedReminders();
    const dateSyncRequested = new Date().getTime();

    store.dispatch(syncRequested(changedReminders, dateSyncRequested, type));

    return testHook('sync', () => Promise.resolve())()
      .then(() =>
        // @ts-ignore
        api.sync({ reminders: changedReminders, dateSyncRequested }))
      .then((newItems: any) => {
        if (!isLoggedIn()) return;

        const action = syncSuccess(
          changedReminders,
          dateSyncRequested,
          newItems,
          type
        );

        store.dispatch(action);
      })
      .catch((e: any) => {
        if (!isLoggedIn()) return undefined;

        const action = syncFailed(changedReminders, dateSyncRequested, e, type);
        store.dispatch(action);

        return e;
      })
      .then((e: any) => {
        currentSyncStatus = 'FINISHED';

        if (!isLoggedIn()) return;

        if (syncWhenFinished) {
          sync('queued')
            .then((res: any) => {
              if (resolveNextSync) resolveNextSync(res);
            })
            .catch((nextError: any) => {
              if (rejectNextSync) rejectNextSync(nextError);
            })
            .then(() => {
              setNextSyncPromise();
            });
        }

        if (e) throw e;
      });
  } catch (e) {
    currentSyncStatus = 'FINISHED';
    // TODO: Log
    return Promise.reject(e);
  }
};

/**
 * Run a sync, or queue up another sync if one is in progress
 */
const scheduleSync = (type: SyncType) => {
  if (!isLoggedIn()) return Promise.resolve();

  if (currentSyncStatus === 'REQUESTED') {
    if (type === 'cron') return Promise.resolve();

    syncWhenFinished = true;
    return nextSyncPromise;
  }

  try {
    return sync(type).catch((e: any) =>
      // TODO: Log
      Promise.reject(e));
  } catch (e) {
    // TODO: Log
    return Promise.reject(e);
  }
};

/**
 * Start the sync cron
 */
export const startSyncCron = (interval: number = 10000) => {
  try {
    if (cron) clearInterval(cron);

    cron = setInterval(() => {
      if (testHookExists('syncCron', 'none')) return;

      if (!isLoggedIn()) {
        if (cron) clearInterval(cron);
        return;
      }

      try {
        sync('cron').catch((e: any) =>
          // TODO: Log
          Promise.reject(e));
      } catch (e) {
        // TODO: Log
      }
    }, interval);
  } catch (e) {
    // TODO: Log
  }
};

export default scheduleSync;
