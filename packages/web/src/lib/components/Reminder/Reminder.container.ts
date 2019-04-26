import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import {
  deleteReminder,
  setSnooze,
  toggleReminderDone,
} from 'src/lib/store/reminders/actions';
import {
  getReminder,
  isDone,
  isRepeated,
  isSnoozed,
} from 'src/lib/store/reminders/selectors';
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
const mapStateToProps = (
  state: IState,
  { id }: IPassedProps
): IContainerStateProps => {
  const reminder = getReminder(state, id);

  return {
    isDone: isDone(state, id),
    isRepeated: isRepeated(state, id),
    isSnoozed: isSnoozed(state, id),
    saveStatus: (reminder && reminder.saveStatus) || undefined,
    text: (reminder && reminder.text) || undefined,
  };
};

/**
 * Wrap the dispatch methods and pass to props
 */
const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: IPassedProps
): IContainerDispatchProps => ({
  onDelete: () => dispatch(deleteReminder(id)),
  onSetDone: (val: boolean) => () => dispatch(toggleReminderDone(id, val)),
  onSetDueDate: (time: number) => dispatch(setSnooze(id, time)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Reminder);
