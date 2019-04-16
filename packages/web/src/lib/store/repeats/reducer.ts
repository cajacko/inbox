import { PostActions } from 'src/lib/store/actions';
import { SET_REMINDER_REPEAT } from 'src/lib/store/repeats/actions';

export type RepeatTypes = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface IRepeat {
  type: RepeatTypes;
  nextOccurrence: number;
}

export interface IState {
  [key: string]: IRepeat;
}

export type IJSState = IState;

const initialState: IState = {};

/**
 * Repeat reducer
 */
const reducer = (state: IState = initialState, action: PostActions): IState => {
  switch (action.type) {
    case SET_REMINDER_REPEAT: {
      const { reminderId, type, startDate } = action.payload;

      return {
        ...state,
        [reminderId]: {
          nextOccurrence: startDate,
          type,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
