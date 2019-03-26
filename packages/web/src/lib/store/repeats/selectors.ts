/* eslint id-length: 0 */
import { IState } from 'src/lib/store/reducers';

/**
 * Is the reminder a repeated one or not
 */
export const isRepeated = (state: IState, id?: string) => {
  // TODO: Actually decide
  if (state) return true;

  return false;
};

/**
 * Get the repeat text to show
 */
export const getRepeatText = (state: IState, id?: string) => {
  // TODO: Actually decide
  if (state) return 'Does not repeat';

  return '';
};
