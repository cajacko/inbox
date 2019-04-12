import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import Animated from 'src/packages/animated';
import unit from 'src/utils/unit';
import AnimateClose from './AnimateClose.render';

interface IProps {
  children: (renderProps: {
    closeAndRun: (func: (...args: any) => any) => () => void;
    height: Animated.AnimatedInterpolation;
  }) => Children;
  height: number;
  testID?: string;
}

/**
 * Handle the closing animation
 */
class AnimateCloseComponent extends React.Component<IProps> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.height = props.height;

    this.heightAnimation = new Animated.Value(1);

    this.closeAndRun = this.closeAndRun.bind(this);
  }

  /**
   * Animate the reminder to close
   */
  private animateClose() {
    return new Promise((resolve) => {
      Animated.timing(this.heightAnimation, {
        duration: 250,
        toValue: 0,
      }).start(() => {
        resolve();
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
      <AnimateClose height={height} testID={this.props.testID}>
        {this.props.children({ closeAndRun: this.closeAndRun, height })}
      </AnimateClose>
    );
  }
}

export default AnimateCloseComponent;
