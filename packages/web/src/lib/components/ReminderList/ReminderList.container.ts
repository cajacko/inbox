import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { selectOrderedRemindersKeys } from 'src/lib/store/reminders/selectors';
import ReminderList, {
  IContainerStateProps,
  IPassedProps,
} from './ReminderList.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState, { list }: IPassedProps) => ({
  reminders: selectOrderedRemindersKeys(state, list),
  syncing: state.sync.type === 'REQUESTED' && state.sync.syncType === 'manual',
});

export default connect<IContainerStateProps>(mapStateToProps)(ReminderList);
