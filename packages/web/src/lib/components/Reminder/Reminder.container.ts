import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import {
  deleteReminder,
  setDueDate,
  toggleReminderDone,
} from 'src/lib/store/reminders/actions';
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
const mapStateToProps = (state: IState, { id }: IPassedProps) => ({
  ...state.reminders[id],
  isDone: state.reminders[id].status === 'DONE',
  isSnoozed: state.reminders[id].status === 'SNOOZED',
});

/**
 * Wrap the dispatch methods and pass to props
 */
const mapDispatchToProps = (dispatch: Dispatch, { id }: IPassedProps) => ({
  onDelete: () => dispatch(deleteReminder(id)),
  onSetDone: (val: boolean) => () => dispatch(toggleReminderDone(id, val)),
  onSetDueDate: (time: number) => dispatch(setDueDate(id, time)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
