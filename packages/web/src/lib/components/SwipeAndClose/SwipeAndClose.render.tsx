import * as React from 'react';
import { SwipeRow } from 'src/components';
import { Ref } from 'src/components/SwipeRow';
import { Children } from 'src/lib/types/libs';
import Animated from 'src/packages/animated';
import { Wrapper } from './SwipeAndClose.style';

export interface IProps {
  height: Animated.AnimatedInterpolation;
  component: Children;
  disableLeftSwipe: boolean;
  disableRightSwipe: boolean;
  setSwipeRef: (ref: Ref) => void;
  onRowOpen: () => void;
  onRowDidClose: () => void;
  showSwiper: boolean;
  onSwipeValueChange: (res: { value: number }) => void;
  children: Children;
}

/**
 * Display a list of reminders
 */
const SwipeAndClose = (props: IProps) => {
  if (props.showSwiper) {
    return (
      <SwipeRow
        hidden={props.component}
        disableLeftSwipe={props.disableLeftSwipe}
        disableRightSwipe={props.disableRightSwipe}
        ref={props.setSwipeRef}
        onRowOpen={props.onRowOpen}
        onRowDidClose={props.onRowDidClose}
        onSwipeValueChange={props.onSwipeValueChange}
        leftOpenValue={150}
        rightOpenValue={-150}
        stopLeftSwipe={200}
        stopRightSwipe={-200}
      >
        {props.children}
      </SwipeRow>
    );
  }

  return <Wrapper style={{ height: props.height }}>{props.children}</Wrapper>;
};

export default SwipeAndClose;
