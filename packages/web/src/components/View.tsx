import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import styled from 'styled-components';

interface IProps {
  children: Children;
  className?: string;
}

const Container = styled.div`
  display: flex;
`;

/**
 * Render text on the web
 */
const View = ({ children, className }: IProps) => (
  <Container className={className}>{children}</Container>
);

export default View;
