import { SYNC_ACTIONS as REMINDER_SYNC_ACTIONS } from 'src/lib/store/reminders/actions';
import { SYNC_ACTIONS as USER_SYNC_ACTIONS } from 'src/lib/store/user/actions';

export default REMINDER_SYNC_ACTIONS.concat(USER_SYNC_ACTIONS);
