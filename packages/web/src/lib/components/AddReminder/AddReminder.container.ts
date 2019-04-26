import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import {
  deleteReminder,
  setReminder,
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
import AddReminder, {
  IContainerDispatchProps,
  IContainerStateProps,
} from './AddReminder.component';
import { IPassedProps } from './AddReminder.render';

/**
 * Get the reminder from the store if it exists
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
    text: (reminder && reminder.text) || undefined,
  };
};

/**
 * Wrap the save func in redux dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch): IContainerDispatchProps => ({
  delete: (id: string) => dispatch(deleteReminder(id)),
  onSetDueDate: (id: string, time: number) => dispatch(setSnooze(id, time)),
  save: (text: string, dueDate?: number, id?: string) =>
    dispatch(setReminder(id, text, dueDate)),
  setDone: (id: string, val: boolean) => dispatch(toggleReminderDone(id, val)),
});

export default connect<
IContainerStateProps,
IContainerDispatchProps,
IPassedProps
>(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);
