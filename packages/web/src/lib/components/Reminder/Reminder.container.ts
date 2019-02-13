import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { deleteReminder } from 'src/lib/store/reminders/actions';
import { Dispatch } from 'src/lib/types/libs';
import Reminder from './Reminder.component';
import {
  IContainerDispatchProps,
  IContainerStateProps,
  IPassedProps,
} from './Reminder.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState, { id }: IPassedProps) =>
  state.reminders[id];

/**
 * Wrap the dispatch methods and pass to props
 */
const mapDispatchToProps = (dispatch: Dispatch, { id }: IPassedProps) => ({
  onDelete: () => dispatch(deleteReminder(id)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
