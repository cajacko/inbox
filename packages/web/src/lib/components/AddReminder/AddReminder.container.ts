import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { deleteReminder, setReminder } from 'src/lib/store/reminders/actions';
import { Dispatch } from 'src/lib/types/libs';
import AddReminder, {
  IContainerDispatchProps,
  IContainerStateProps,
} from './AddReminder.component';
import { IPassedProps } from './AddReminder.render';

/**
 * Get the reminder from the store if it exists
 */
const mapStateToProps = (state: IState, { id }: IPassedProps) =>
  (id ? state.reminders[id] : {});

/**
 * Wrap the save func in redux dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delete: (id: string) => dispatch(deleteReminder(id)),
  save: (reminder: string, id?: string) => dispatch(setReminder(id, reminder)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);
