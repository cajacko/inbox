import createReducer from 'src/lib/utils/createReducer';
import { SYNC_FAILED, SYNC_REQUESTED, SYNC_SUCCESS } from './actions';

export interface IState {
  type: 'INIT' | 'REQUESTED' | 'FAILED' | 'SUCCESS';
  error: string | null;
}

export type IJSState = IState;

const initialState: IState = {
  error: null,
  type: 'INIT',
};

export default createReducer<IState>(initialState, {
  [SYNC_REQUESTED]: (): IState => ({ type: 'REQUESTED', error: null }),
  [SYNC_FAILED]: (state: IState, { error }: { error: string }): IState => ({
    error: error || null,
    type: 'FAILED',
  }),
  [SYNC_SUCCESS]: (): IState => ({ type: 'SUCCESS', error: null }),
});
