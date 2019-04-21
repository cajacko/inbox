/* eslint id-length: 0 */
import { buildReminderLists } from 'src/lib/store/reminders/actions';
import store from 'src/lib/utils/store';
import v1 from './v1';

export const migrations = {
  1: v1,
};

/**
 * After the migration this action will run. Useful for calling a redux action
 * that might process the data in someway
 */
export const postMigrate = () => {
  store.dispatch(buildReminderLists());
  return Promise.resolve();
};
