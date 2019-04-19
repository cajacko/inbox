import { PostActions } from 'src/lib/store/actions';
import { IState } from 'src/lib/store/types';
import { SYNC_FAILED, SYNC_REQUESTED, SYNC_SUCCESS } from './actions';

const initialState: IState['sync'] = {
  error: null,
  syncType: null,
  type: 'INIT',
};

/**
 * The sync reducer
 */
const reducer = (state: IState['sync'] = initialState, action: PostActions) => {
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
