import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import {
  removeReminderRepeat,
  setReminderRepeat,
} from 'src/lib/store/reminders/actions';
import { getRepeatText } from 'src/lib/store/reminders/selectors';
import { RepeatSimpleTypes } from 'src/lib/store/types';
import { Dispatch } from 'src/lib/types/libs';
import Repeat, {
  IContainerDispatchProps,
  IContainerStateProps,
  IPassedProps,
} from './Repeat.component';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState, { id }: IPassedProps) => ({
  repeatText: getRepeatText(state, id),
});

/**
 * Wrap the dispatch methods and pass to props
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveRepeat: (id: string) => dispatch(removeReminderRepeat(id)),
  onSetRepeat: (type: RepeatSimpleTypes, startDate: number, id: string) =>
    dispatch(setReminderRepeat(type, startDate, id)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Repeat);
