import { connect } from 'react-redux';
import { IState } from 'src/lib/store/reducers';
import Login, { IContainerStateProps } from './Login.component';

/**
 * Grab the state from the store and pass in isLoggedIn as a prop
 */
const mapStateToProps = ({ login: { loginText } }: IState) => ({
  description: loginText || undefined,
});

export default connect<IContainerStateProps>(mapStateToProps)(Login);
