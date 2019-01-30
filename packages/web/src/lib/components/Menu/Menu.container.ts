import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import Menu from './Menu.render';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ user: { displayName } }: IState) => ({
  name: displayName,
});

export default connect(mapStateToProps)(Menu);
