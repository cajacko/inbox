import * as React from 'react';
import Measure from 'src/lib/components/Layout/Measure';
import {
  Container,
  Content,
  FULL_SCREEN_BREAKPOINT,
  FullContent,
  Overlay,
} from './Modal.style';

interface IComponentProps {
  fullScreen: boolean;
  [key: string]: any;
}

interface IProps {
  Component: (props: IComponentProps) => JSX.Element;
  props: { [key: string]: any };
}

interface ISize {
  width: number;
}

/**
 * Should the full screen by shown
 */
const showFullScreen = (width: number) => width < FULL_SCREEN_BREAKPOINT;

/**
 * On width change, see if we should re-render
 */
const onChange = (next: ISize, prev: ISize) =>
  showFullScreen(next.width) !== showFullScreen(prev.width);

/**
 *  Displays a modal overlay
 */
const Modal = ({ Component, props }: IProps) => (
  <Measure onChange={onChange}>
    {({ width, measureProps }) => (
      <Container {...measureProps}>
        {showFullScreen(width) ? (
          <FullContent>
            <Component fullScreen {...props} />
          </FullContent>
        ) : (
          <React.Fragment>
            <Content>
              <Component fullScreen={false} {...props} />
            </Content>
            <Overlay />
          </React.Fragment>
        )}
      </Container>
    )}
  </Measure>
);

export default Modal;
