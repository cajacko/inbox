import * as React from 'react';
import { Ref } from 'src/components/SwipeRow';
import AppError from 'src/lib/modules/AppError';
import { Children } from 'src/lib/types/libs';
import Animated from 'src/packages/animated';
import unit from 'src/utils/unit';
import SwipeAndClose from './SwipeAndClose.render';

type Func = () => void;

interface IState {
  showSwiper: boolean;
  showLeftComponent: boolean;
}

interface IProps {
  component?: Children;
  leftComponent?: Children;
  rightComponent?: Children;
  children: (renderProps: {
    closeAndRun: (func: (...args: any) => any) => () => void;
  }) => Children;
  height: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeLeftAnimateClose?: boolean;
  onSwipeRightAnimateClose?: boolean;
  onSwipeLeftWaitForClose?: boolean;
  onSwipeRightWaitForClose?: boolean;
}

/**
 * Business logic for the reminder component, handles showing the modal
 */
class SwipeAndCloseComponent extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      showLeftComponent: true,
      showSwiper: true,
    };

    this.height = props.height;

    this.heightAnimation = new Animated.Value(1);

    this.setSwipeRef = this.setSwipeRef.bind(this);
    this.onRowOpen = this.onRowOpen.bind(this);
    this.onRowDidClose = this.onRowDidClose.bind(this);
    this.closeAndRun = this.closeAndRun.bind(this);
    this.onSwipeValueChange = this.onSwipeValueChange.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }

  private onRowDidCloseFunc: Func | null = null;

  /**
   * When the row closes, check if we should dispatch the action, and do it if
   * so
   */
  private onRowDidClose() {
    if (this.onRowDidCloseFunc) {
      this.onRowDidCloseFunc();
      this.onRowDidCloseFunc = null;
    }
  }

  /**
   * When the swiper row opens, indicate we've opened it, then close the row
   */
  private onRowOpen() {
    let immediateFunc;

    if (this.state.showLeftComponent && this.props.onSwipeLeft) {
      if (this.props.onSwipeLeftWaitForClose) {
        this.onRowDidCloseFunc = this.props.onSwipeLeft;
      } else {
        immediateFunc = this.props.onSwipeLeft;
      }
    } else if (!this.state.showLeftComponent && this.props.onSwipeRight) {
      if (this.props.onSwipeRightWaitForClose) {
        this.onRowDidCloseFunc = this.props.onSwipeRight;
      } else {
        immediateFunc = this.props.onSwipeRight;
      }
    }

    if (immediateFunc) immediateFunc();

    if (this.swipeRef && this.swipeRef.closeRow) {
      this.swipeRef.closeRow();
    } else if (this.onRowDidCloseFunc) {
      this.onRowDidCloseFunc();
      this.onRowDidCloseFunc = null;
    }
  }

  /**
   * When the swiper value changes, decide which children to show
   */
  private onSwipeValueChange({ value }: { value: number }) {
    if (value === 0) {
      return;
    }

    if (value > 0 && !this.state.showLeftComponent) {
      this.setState({ showLeftComponent: true });
    } else if (value < 0 && this.state.showLeftComponent) {
      this.setState({ showLeftComponent: false });
    }
  }

  /**
   * Figure out which component direction to show
   */
  private getComponent(): Children {
    if (!this.props.leftComponent && !this.props.rightComponent) {
      if (this.props.component) return this.props.component;

      throw new AppError('No component for swiper', '100-020');
    }

    if (this.state.showLeftComponent) {
      if (this.props.leftComponent) return this.props.leftComponent;
      if (this.props.component) return this.props.component;

      return this.props.rightComponent;
    }

    if (this.props.rightComponent) return this.props.rightComponent;
    if (this.props.component) return this.props.component;

    return this.props.leftComponent;
  }

  /**
   * Set the swiper ref
   */
  private setSwipeRef(ref: Ref) {
    this.swipeRef = ref;
  }

  /**
   * Animate the reminder to close
   */
  private animateClose() {
    return new Promise((resolve) => {
      this.setState({ showSwiper: false }, () => {
        Animated.timing(this.heightAnimation, {
          duration: 250,
          toValue: 0,
        }).start(() => {
          resolve();
        });
      });
    });
  }

  /**
   * Close the swiper then run the callback
   */
  private closeAndRun(func: (...args: any[]) => any) {
    return () => {
      this.animateClose().then(() => {
        func();
      });
    };
  }

  private swipeRef: Ref;
  private heightAnimation: Animated.Value;
  private height: number;

  /**
   * Render the component
   */
  public render() {
    const height = this.heightAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [unit(0), unit(this.height)],
    });

    return (
      <SwipeAndClose
        height={height}
        component={this.getComponent()}
        disableLeftSwipe={!this.props.component && !this.props.rightComponent}
        disableRightSwipe={!this.props.component && !this.props.leftComponent}
        setSwipeRef={this.setSwipeRef}
        onRowOpen={this.onRowOpen}
        onRowDidClose={this.onRowDidClose}
        showSwiper={this.state.showSwiper}
        onSwipeValueChange={this.onSwipeValueChange}
      >
        {this.props.children({ closeAndRun: this.closeAndRun })}
      </SwipeAndClose>
    );
  }
}

export default SwipeAndCloseComponent;
