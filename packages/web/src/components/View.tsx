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

type Ref = React.RefObject<HTMLDivElement>;

/**
 * Given the styled component to use, return the view component
 */
export const withView = (styledComponent: any, shouldWrap: boolean) => {
  let Container = shouldWrap ? styled(styledComponent) : styledComponent;
  Container = Container`
    display: flex;
    flex-direction: column;
  `;

  return React.forwardRef(({
    className, testID, children, ...props
  }: IProps, ref: Ref) => (
      <Container
        className={mergeClasses(className, testID)}
        ref={ref}
        {...props}
      >
        {typeof children === 'function' ? children({}) : children}
      </Container>
  ));
};

export default withView(styled.div, false);
