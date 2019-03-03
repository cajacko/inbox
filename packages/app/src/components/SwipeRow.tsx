import * as React from 'react';
import { SwipeRow as RNSwipeRow } from 'react-native-swipe-list-view';
import { Children } from 'src/lib/types/libs';

interface IProps {
  children: Children;
  hidden: Children;
  disableLeftSwipe?: boolean;
  disableRightSwipe?: boolean;
  leftOpenValue?: number;
  rightOpenValue?: number;
  onRowOpen?: () => void;
  onRowDidClose?: () => void;
  onSwipeValueChange?: (res: { value: number }) => void;
  stopLeftSwipe?: number;
  stopRightSwipe?: number;
}

/**
 * Get the friction to use, 100 disables it
 */
const getFriction = ({
  disableLeftSwipe,
  disableRightSwipe,
}: {
  disableLeftSwipe?: boolean;
  disableRightSwipe?: boolean;
  }) => {
  if (disableLeftSwipe || disableRightSwipe) {
    return {
      friction: 100,
    };
  }

  return {};
};

export type Ref = React.RefObject<RNSwipeRow>;

/**
 * Render text on the web
 */
const SwipeRow = ({ children, hidden, ...props }: IProps, ref: Ref) => (
  <RNSwipeRow {...getFriction(props)} {...props} ref={ref}>
    {hidden}
    {children}
  </RNSwipeRow>
);

export default React.forwardRef(SwipeRow);
