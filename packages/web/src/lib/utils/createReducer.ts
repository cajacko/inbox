import { IAction, IPayload } from 'src/lib/types/libs';

type State = any;

interface IHandlers {
  [key: string]: (state: State, payload: IPayload) => void;
}

/**
 * Create a reducer
 */
const createReducer = (initialState: State, handlers: IHandlers) => (
  state = initialState,
  action: IAction
) => {
  const handler = handlers[action.type];

  if (!handler) return state;

  return handler(state, action.payload);
};

export default createReducer;
