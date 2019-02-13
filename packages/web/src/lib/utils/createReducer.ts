import { IAction, IPayload } from 'src/lib/types/libs';

/**
 * Create a reducer
 */
const createReducer = <State>(
  initialState: State,
  handlers: { [key: string]: (state: State, payload: IPayload) => State }
) => (state = initialState, action: IAction) => {
  const handler = handlers[action.type];

  if (!handler) return state;

  return handler(state, action.payload);
};

export default createReducer;
