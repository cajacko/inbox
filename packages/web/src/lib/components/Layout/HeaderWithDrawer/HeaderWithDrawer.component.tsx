import * as React from 'react';
import { MENU_WIDTH } from 'src/lib/components/Menu/Menu.style';
import Animated from 'src/packages/animated';
import unit from 'src/utils/unit';
import HeaderWithDrawer from './HeaderWithDrawer.render';
import { ANIMATION_DURATION } from './HeaderWithDrawer.style';

interface IProps {
  children: JSX.Element;
}

interface IState {
  menuIsOpen: boolean;
  renderMenu: boolean;
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
      menuIsOpen: false,
      renderMenu: false,
    };

    this.animation = new Animated.Value(0);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  private animation: Animated.Value;

  /**
   * Close the menu
   */
  private close() {
    this.setState({ menuIsOpen: false, renderMenu: true }, () => {
      Animated.timing(this.animation, {
        duration: ANIMATION_DURATION,
        toValue: 0,
      }).start(() => {
        this.setState({ renderMenu: false });
      });
    });
  }

  /**
   * Open the menu
   */
  private open() {
    this.setState({ menuIsOpen: true, renderMenu: true }, () => {
      Animated.timing(this.animation, {
        duration: ANIMATION_DURATION,
        toValue: 1,
      }).start();
    });
  }

  /**
   * Render the component
   */
  public render() {
    const menuLeft = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [unit(-MENU_WIDTH), unit(0)],
    });

    return (
      <HeaderWithDrawer
        renderMenu={this.state.renderMenu}
        menuIsOpen={this.state.menuIsOpen}
        menuLeft={menuLeft}
        overlayOpacity={this.animation}
        close={this.close}
        open={this.open}
        {...this.props}
      />
    );
  }
}

export default HeaderWithDrawerC;
