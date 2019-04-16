import { IApiReminder } from 'src/lib/graphql/types';
import { SyncType } from 'src/lib/utils/sync';

export const SYNC_REQUESTED = 'SYNC_REQUESTED';
export const SYNC_SUCCESS = 'SYNC_SUCCESS';
export const SYNC_FAILED = 'SYNC_FAILED';

export interface ISyncRequestedAction {
  type: typeof SYNC_REQUESTED;
  payload: {
    changedReminders: IApiReminder[];
    dateSyncRequested: number;
    syncType: SyncType;
  };
}

/**
 * Sync requested action
 */
export const syncRequested = (
  changedReminders: ISyncRequestedAction['payload']['changedReminders'],
  dateSyncRequested: number,
  syncType: SyncType
): ISyncRequestedAction => ({
  payload: {
    changedReminders,
    dateSyncRequested,
    syncType,
  },
  type: SYNC_REQUESTED,
});

export interface ISyncSuccessAction {
  type: typeof SYNC_SUCCESS;
  payload: {
    changedReminders: IApiReminder[];
    dateSyncRequested: number;
    newItems: {
      reminders: IApiReminder[];
    };
    syncType: SyncType;
  };
}

/**
 * Sync success action
 */
export const syncSuccess = (
  changedReminders: ISyncSuccessAction['payload']['changedReminders'],
  dateSyncRequested: number,
  newItems: ISyncSuccessAction['payload']['newItems'],
  syncType: SyncType
): ISyncSuccessAction => ({
  payload: {
    changedReminders,
    dateSyncRequested,
    newItems,
    syncType,
  },
  type: SYNC_SUCCESS,
});

export interface ISyncFailedAction {
  type: typeof SYNC_FAILED;
  payload: {
    changedReminders: IApiReminder[];
    dateSyncRequested: number;
    syncType: SyncType;
    error: string;
  };
}

/**
 * Sync failed action
 */
export const syncFailed = (
  changedReminders: ISyncFailedAction['payload']['changedReminders'],
  dateSyncRequested: number,
  error: string,
  syncType: SyncType
): ISyncFailedAction => ({
  payload: {
    changedReminders,
    dateSyncRequested,
    error,
    syncType,
  },
  type: SYNC_FAILED,
});
