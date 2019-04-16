import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import {
  deleteReminder,
  setDueDate,
  setReminder,
  toggleReminderDone,
} from 'src/lib/store/reminders/actions';
import { isRepeated } from 'src/lib/store/repeats/selectors';
import { Dispatch } from 'src/lib/types/libs';
import AddReminder, {
  IContainerDispatchProps,
  IContainerStateProps,
} from './AddReminder.component';
import { IPassedProps } from './AddReminder.render';

/**
 * Get the reminder from the store if it exists
 */
const mapStateToProps = (state: IState, { id }: IPassedProps) => {
  const props: any = id ? state.reminders[id] : {};

  return {
    ...props,
    isDone: props.status === 'DONE',
    isRepeated: !id ? false : isRepeated(state, id),
    isSnoozed: props.status === 'SNOOZED',
  };
};

/**
 * Wrap the save func in redux dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (id: string) => dispatch(deleteReminder(id)),
  onSetDueDate: (id: string, time: number) => dispatch(setDueDate(id, time)),
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
