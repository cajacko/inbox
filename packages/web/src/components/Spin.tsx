import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children: JSX.Element;
  size: number;
}

const Container = styled.div`
  display: flex;
  transform: rotate(-45deg);
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    70% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Rotate the children
 */
const Spin = ({ size, children }: IProps) => (
  <Container style={{ height: size, width: size }}>{children}</Container>
);

export default Spin;
