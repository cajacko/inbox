export type SyncType = 'cron' | 'action' | 'init' | 'queued' | 'manual';

export interface IReminder {
  id: string;
  text: string;
  dateModified: number;
  dateCreated: number;
  dueDate: number;
  saveStatus: 'saving' | 'saved' | 'error';
  status: 'DONE' | 'DELETED' | 'INBOX' | 'SNOOZED';
}

export interface IPersistedState {
  reminders: {
    // Not completely accurate having undefined, but this is the only way for
    // TS to ensure we check a reminder exists when we try and get it by ID,
    // as it may not exist
    [key: string]: IReminder | undefined;
  };
  user: {
    isLoggedIn: boolean;
    id: string | null;
    displayName: string | null;
    refreshToken?: string | null;
    photoURL: string | null;
  };
}

// IMPORTANT - any added/removed keys must be reflected in the BLACKLIST const
// in this file. If you can enforce this through types somehow, then do it
interface IBlacklistState {
  login: {
    loginText: string | null;
    reloginId: string | null;
  };
  sync: {
    type: 'INIT' | 'REQUESTED' | 'FAILED' | 'SUCCESS';
    error: string | null;
    syncType: SyncType | null;
  };
}

// IMPORTANT - any added/removed keys must be reflected in the IBlacklistState
// interface in this file. If you can enforce this through types somehow, then
// do it
export const BLACKLIST: Array<keyof IBlacklistState> = ['login', 'sync'];

export interface IState extends IPersistedState, IBlacklistState {}
