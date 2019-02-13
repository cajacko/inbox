/* eslint import/export: 0 */

declare module 'animated/lib/targets/react-dom' {
  namespace Animated {
    interface IConstructable<T> {
      new (val: number): T;

      interpolate: (opts: { inputRange: number[]; outputRange: string[] }) => T;
    }

    export type Value = IConstructable<any>;

    export const Value: Value;
    export type AnimatedInterpolation = Value;

    export type div = React.ReactType<any>;

    export const div: div;

    export type timing = (
      val: Value,
      opts: {
        toValue: number;
        duration: number;
      }
    ) => {
      start: (callback?: () => void) => void;
    };

    export const timing: timing;
  }

  export default Animated;
}
