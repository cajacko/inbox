interface IConstructable<T> {
  new (val: number): T;

  interpolate: (opts: { inputRange: number[]; outputRange: string[] }) => T;
}

declare namespace Animated {
  export type Value = IConstructable<any>;

  export type div = React.ReactType<any>;
  export type timing = (
    val: Value,
    opts: {
      toValue: number;
      duration: number;
    }
  ) => {
    start: (callback?: () => void) => void;
  };
}

declare module 'animated/lib/targets/react-dom' {
  const animated: {
    Value: Animated.Value;
    div: Animated.div;
    timing: Animated.timing;
    };

  export default animated;
}
