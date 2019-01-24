import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import Home from './Home.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ user: { displayName } }: IState) => ({
  displayName,
});

export default connect(mapStateToProps)(Home);
