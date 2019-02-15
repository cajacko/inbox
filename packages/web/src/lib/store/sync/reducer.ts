import createReducer from 'src/lib/utils/createReducer';
import { SyncType } from 'src/lib/utils/sync';
import { SYNC_FAILED, SYNC_REQUESTED, SYNC_SUCCESS } from './actions';

export interface IState {
  type: 'INIT' | 'REQUESTED' | 'FAILED' | 'SUCCESS';
  error: string | null;
  syncType: SyncType | null;
}

export type IJSState = IState;

const initialState: IState = {
  error: null,
  syncType: null,
  type: 'INIT',
};

export default createReducer<IState>(initialState, {
  [SYNC_REQUESTED]: (state, { syncType }: { syncType: SyncType }): IState => ({
    error: null,
    syncType,
    type: 'REQUESTED',
  }),
  [SYNC_FAILED]: (
    state: IState,
    { error, syncType }: { error: string; syncType: SyncType }
  ): IState => ({
    error: error || null,
    syncType,
    type: 'FAILED',
  }),
  [SYNC_SUCCESS]: (state, { syncType }: { syncType: SyncType }): IState => ({
    error: null,
    syncType,
    type: 'SUCCESS',
  }),
});
