import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import Animated from 'src/packages/animated';
import { Container } from './AnimateClose.style';

export interface IProps {
  height: Animated.AnimatedInterpolation;
  children: Children;
  testID?: string;
}

/**
 * Render the view we're going to close
 */
const AnimateClose = (props: IProps) => (
  <Container style={{ height: props.height }} testID={props.testID}>
    {props.children}
  </Container>
);

export default AnimateClose;