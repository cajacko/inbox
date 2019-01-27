import * as React from 'react';
import spin from 'src/lib/config/spin';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import styled, { keyframes } from 'styled-components';

interface IProps {
  children: JSX.Element;
  size: number;
}

/**
 * Get the spin style
 */
const style = () => {
  if (isTestEnv()) return '';

  return spin.reduce(
    (acc, { percentage, rotation }) =>
      `${acc}\n${percentage * 100}% { transform: rotate(${rotation}deg); }`,
    ''
  );
};

const rotate = keyframes`${style()}`;

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
