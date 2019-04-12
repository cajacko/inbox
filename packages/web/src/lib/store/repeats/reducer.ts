import { SET_REMINDER_REPEAT } from 'src/lib/store/repeats/actions';
import createReducer from 'src/lib/utils/createReducer';

export type RepeatTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type ActionRepeatTypes = RepeatTypes | 'NO_REPEAT';

export interface IRepeat {
  type: RepeatTypes;
  nextOccurrence: number;
}

export interface IState {
  [key: string]: IRepeat;
}

export type IJSState = IState;

const initialState: IState = {};

export default createReducer(initialState, {
  [SET_REMINDER_REPEAT]: (state, { type, startDate, reminderId }) => {
    if (!reminderId) return state;

    if (type === 'NO_REPEAT') {
      const newState = Object.assign({}, state);
      delete newState[reminderId];
      return newState;
    }

    return {
      ...state,
      [reminderId]: {
        nextOccurrence: startDate,
        type,
      },
    };
  },
});
