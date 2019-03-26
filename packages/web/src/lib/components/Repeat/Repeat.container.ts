import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import { setReminderRepeat } from 'src/lib/store/repeats/actions';
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
const mapDispatchToProps = (dispatch: Dispatch, { id }: IPassedProps) => ({
  onSetRepeat: (payload: any) => dispatch(setReminderRepeat(payload)),
});

export default connect<IContainerStateProps, IContainerDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Repeat);
