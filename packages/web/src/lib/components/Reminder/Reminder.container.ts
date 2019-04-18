import { connect } from 'react-redux';
import CustomDate from 'src/lib/modules/CustomDate';
import { IState } from 'src/lib/store/reducers';
import {
  deleteReminder,
  setSnooze,
  toggleReminderDone,
} from 'src/lib/store/reminders/actions';
import { isRepeated } from 'src/lib/store/reminders/selectors';
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
  isRepeated: isRepeated(state, id),
  isSnoozed: state.reminders[id].dueDate > CustomDate.now(),
});

/**
 * Wrap the dispatch methods and pass to props
 */
const mapDispatchToProps = (dispatch: Dispatch, { id }: IPassedProps) => ({
  onDelete: () => dispatch(deleteReminder(id)),
  onSetDone: (val: boolean) => () => dispatch(toggleReminderDone(id, val)),
  onSetDueDate: (time: number) => dispatch(setSnooze(id, time)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
