import { connect } from 'react-redux';
import { setReminder } from 'src/lib/store/reminders/actions';
import { Dispatch } from 'src/lib/types/libs';
import AddReminder, { IContainerDispatchProps } from './AddReminder.component';

/**
 * Wrap the save func in redux dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: (reminder: string) => dispatch(setReminder(undefined, reminder)),
});

export default connect<{}, IContainerDispatchProps>(
  undefined,
  mapDispatchToProps
)(AddReminder);
