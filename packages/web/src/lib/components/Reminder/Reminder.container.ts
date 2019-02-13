import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import Reminder, {
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState, { id }: IPassedProps) =>
  state.reminders[id];

export default connect<IContainerStateProps>(mapStateToProps)(Reminder);
