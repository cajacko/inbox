import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import ReminderList, { IContainerStateProps } from './ReminderList.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ reminders }: IState) => ({
  reminders: Object.values(reminders),
});

export default connect<IContainerStateProps>(mapStateToProps)(ReminderList);
