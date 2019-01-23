import * as React from 'react';
import spin from 'src/lib/config/spin';
import styled, { keyframes } from 'styled-components';

interface IProps {
  children: JSX.Element;
  size: number;
}

const rotate = keyframes`
${spin.reduce(
    (acc, { percentage, rotation }) =>
      `${acc}\n${percentage * 100}% { transform: rotate(${rotation}deg); }`,
    ''
  )}
`;

const Container = styled.div`
  display: flex;
  animation-name: ${rotate};
  animation-duration: 1200ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

/**
 * Rotate the children
 */
const Spin = ({ size, children }: IProps) => (
  <Container style={{ height: size, width: size }}>{children}</Container>
);

export default Spin;
