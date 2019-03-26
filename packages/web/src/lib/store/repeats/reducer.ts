import createReducer from 'src/lib/utils/createReducer';

export type RepeatTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type ActionRepeatTypes = RepeatTypes | 'NONE';

export interface IRepeat {
  type: RepeatTypes;
}

export interface IState {
  [key: string]: IRepeat;
}

export type IJSState = IState;

const initialState: IState = {};

export default createReducer(initialState, {});
