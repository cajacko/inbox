import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import mergeClasses from 'src/utils/mergeClasses';
import styled from 'styled-components';

interface IProps {
  children: Children;
  className?: string;
  testID?: string;
  style?: { [key: string]: any };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type Ref = React.RefObject<HTMLDivElement>;

/**
 * Render text on the web
 */
const View = React.forwardRef(({
  className, testID, children, ...props
}: IProps, ref: Ref) => (
    <Container className={mergeClasses(className, testID)} ref={ref} {...props}>
      {typeof children === 'function' ? children({}) : children}
    </Container>
));

export default View;
