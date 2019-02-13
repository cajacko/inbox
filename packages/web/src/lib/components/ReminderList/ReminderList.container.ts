import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { selectOrderReminders } from 'src/lib/store/reminders/selectors';
import ReminderList, { IContainerStateProps } from './ReminderList.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState) => ({
  reminders: selectOrderReminders(state),
});

export default connect<IContainerStateProps>(mapStateToProps)(ReminderList);
