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

type Ref = React.RefObject<HTMLDivElement>;

/**
 * Render text on the web
 */
const View = React.forwardRef((props: IProps, ref: Ref) => (
  <Container className={mergeClasses(props.className, props.testID)} ref={ref}>
    {props.children}
  </Container>
));

export default View;
