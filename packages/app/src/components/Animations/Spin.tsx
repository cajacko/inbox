import * as React from 'react';
import { Animated, Easing } from 'react-native';
import spin from 'src/lib/config/spin';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

interface IProps {
  children: JSX.Element;
  size: number;
  pauseAnimation?: boolean;
}

interface IState {
  rotation: Animated.Value;
}

/**
 * Rotate the children
 */
class Spin extends React.Component<IProps, IState> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      rotation: new Animated.Value(1),
    };

    this.animation = null;

    this.runAnimation = this.runAnimation.bind(this);
  }

  /**
   * On mount start the animation
   */
  public componentDidMount() {
    this.runAnimation(this.props);
  }

  /**
   * When the component gets new props see if we should start or stop the
   * animation
   */
  public componentWillReceiveProps(nextProps: IProps) {
    if (
      !this.props.pauseAnimation &&
      nextProps.pauseAnimation &&
      this.animation
    ) {
      this.animation.stop();
    } else if (this.props.pauseAnimation && !nextProps.pauseAnimation) {
      this.runAnimation(nextProps);
    }
  }

  private animation: null | Animated.CompositeAnimation;

  /**
   * Loop the animation
   */
  private runAnimation({ pauseAnimation }: IProps) {
    if (isTestEnv()) return;
    if (pauseAnimation) return;

    this.state.rotation.setValue(0);

    this.animation = Animated.timing(this.state.rotation, {
      duration: 1200,
      easing: Easing.linear,
      toValue: 1,
    });

    this.animation.start(() => this.runAnimation(this.props));
  }

  /**
   * Render the component
   */
  public render() {
    const rotation = this.state.rotation.interpolate({
      inputRange: spin.map(({ percentage }) => percentage),
      outputRange: spin.map(props => `${props.rotation}deg`),
    });

    return (
      <Animated.View
        style={{
          height: this.props.size,
          transform: [{ rotate: rotation }],
          width: this.props.size,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Spin;
