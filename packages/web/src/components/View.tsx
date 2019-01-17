import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import mergeClasses from 'src/utils/mergeClasses';
import styled from 'styled-components';

interface IProps {
  children: Children;
  className?: string;
  testID?: string;
}

const Container = styled.div`
  display: flex;
`;

/**
 * Render text on the web
 */
const View = ({ children, className, testID }: IProps) => (
  <Container className={mergeClasses(className, testID)}>{children}</Container>
);

export default View;
