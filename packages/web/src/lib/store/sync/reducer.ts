import { PostActions } from 'src/lib/store/actions';
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

/**
 * The sync reducer
 */
const reducer = (state: IState = initialState, action: PostActions) => {
  switch (action.type) {
    case SYNC_REQUESTED:
      return {
        error: null,
        syncType: action.payload.syncType,
        type: 'REQUESTED',
      };

    case SYNC_FAILED:
      return {
        error: action.payload.error || null,
        syncType: action.payload.syncType,
        type: 'FAILED',
      };

    case SYNC_SUCCESS:
      return {
        error: null,
        syncType: action.payload.syncType,
        type: 'SUCCESS',
      };

    default:
      return state;
  }
};

export default reducer;
