import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import Route, { IContainerStateProps } from './Route.component';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ user: { isLoggedIn } }: IState) => ({ isLoggedIn });

export default connect<IContainerStateProps>(mapStateToProps)(Route);
