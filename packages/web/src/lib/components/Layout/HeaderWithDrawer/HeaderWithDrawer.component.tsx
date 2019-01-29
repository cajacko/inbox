import * as React from 'react';
import HeaderWithDrawer from './HeaderWithDrawer.render';

interface IProps {
  children: JSX.Element;
}

interface IState {
  showMenu: boolean;
}

/**
 * Business logic for the header with drawer component
 */
class HeaderWithDrawerC extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  /**
   * Close the menu
   */
  private close() {
    this.setState({ showMenu: false });
  }

  /**
   * Open the menu
   */
  private open() {
    this.setState({ showMenu: true });
  }

  /**
   * Render the component
   */
  public render() {
    return (
      <HeaderWithDrawer
        showMenu={this.state.showMenu}
        close={this.close}
        open={this.open}
        {...this.props}
      />
    );
  }
}

export default HeaderWithDrawerC;
