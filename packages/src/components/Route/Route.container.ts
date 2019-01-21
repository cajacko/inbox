import { connect } from 'react-redux';
import { IState } from 'src/lib/types/general';
import Route from './Route.component';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ isLoggedIn }: IState) => ({ isLoggedIn });

export default connect(mapStateToProps)(Route);