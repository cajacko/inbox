import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import HeaderStatus, { IContainerStateProps } from './HeaderStatus.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = (state: IState) => ({ status: state.sync.type });

export default connect<IContainerStateProps>(mapStateToProps)(HeaderStatus);
