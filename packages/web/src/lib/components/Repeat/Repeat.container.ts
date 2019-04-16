import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { setReminderRepeat } from 'src/lib/store/repeats/actions';
import { RepeatTypes } from 'src/lib/store/repeats/reducer';
import { getRepeatText } from 'src/lib/store/repeats/selectors';
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
  onSetRepeat: (type: RepeatTypes, startDate: number, id: string) =>
    dispatch(setReminderRepeat(type, startDate, id)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Repeat);
