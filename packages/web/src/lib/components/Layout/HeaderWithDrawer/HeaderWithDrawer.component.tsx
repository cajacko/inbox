import * as React from 'react';
import AddReminder from 'src/lib/components/AddReminder';
import { MENU_WIDTH } from 'src/lib/components/Menu/Menu.style';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import * as Modal from 'src/lib/context/Modal';
import withConsumer from 'src/lib/HOCs/withConsumer';
import Animated from 'src/packages/animated';
import unit from 'src/utils/unit';
import HeaderWithDrawer, { ActiveKey } from './HeaderWithDrawer.render';
import { ANIMATION_DURATION } from './HeaderWithDrawer.style';

export interface IPassedProps {
  activeKey: ActiveKey;
  backgroundColor: BackgroundColorVal;
  title: string;
}

interface IProps extends IPassedProps {
  children: (props: {
    addButtonSpacing: number;
    maxContentWidth: number;
    isFullWidth: boolean;
  }) => JSX.Element;
  context: Modal.IValue;
}

interface IState {
  menuIsOpen: boolean;
  renderMenu: boolean;
  showTestID: boolean;
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
      showTestID: false,
    };

    this.animation = new Animated.Value(0);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.add = this.add.bind(this);
  }

  private animation: Animated.Value;

  /**
   * Close the menu
   */
  private close() {
    this.setState(
      { menuIsOpen: false, renderMenu: true, showTestID: true },
      () => {
        Animated.timing(this.animation, {
          duration: ANIMATION_DURATION,
          toValue: 0,
        }).start(() => {
          this.setState({ renderMenu: false, showTestID: false });
        });
      }
    );
  }

  /**
   * Open the menu
   */
  private open() {
    this.setState(
      { menuIsOpen: true, renderMenu: true, showTestID: false },
      () => {
        Animated.timing(this.animation, {
          duration: ANIMATION_DURATION,
          toValue: 1,
        }).start(() => {
          this.setState({ showTestID: true });
        });
      }
    );
  }

  /**
   * Show the add modal
   */
  private add() {
    this.props.context.show(AddReminder, {
      close: this.props.context.hide,
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

    const buttonLeft = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [unit(0), unit(MENU_WIDTH)],
    });

    return (
      <HeaderWithDrawer
        add={this.add}
        showTestID={this.state.showTestID}
        renderMenu={this.state.renderMenu}
        menuIsOpen={this.state.menuIsOpen}
        menuLeft={menuLeft}
        buttonLeft={buttonLeft}
        overlayOpacity={this.animation}
        close={this.close}
        open={this.open}
        {...this.props}
      />
    );
  }
}

export default withConsumer(Modal.Consumer)(HeaderWithDrawerC);
