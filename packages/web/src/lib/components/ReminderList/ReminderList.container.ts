import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { selectOrderedRemindersKeys } from 'src/lib/store/reminders/selectors';
import ReminderList, { IContainerStateProps } from './ReminderList.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState) => ({
  reminders: selectOrderedRemindersKeys(state),
  syncing: state.sync.type === 'REQUESTED' && state.sync.syncType === 'manual',
});

export default connect<IContainerStateProps>(mapStateToProps)(ReminderList);
