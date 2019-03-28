import * as React from 'react';
import Button from 'src/lib/components/Button';
import Measure from 'src/lib/components/Layout/Measure';
import {
  BUTTON_STYLE,
  Container,
  Content,
  FullContent,
  Overlay,
} from './Modal.style';

interface IComponentProps {
  fullScreen: boolean;
  [key: string]: any;
}

interface IProps {
  Component: React.ComponentType<IComponentProps>;
  props: { [key: string]: any };
  hide: () => void;
  zIndex: number;
  fullScreenBreakpoint?: number;
}

interface ISize {
  width: number;
}

/**
 * Should the full screen by shown
 */
const showFullScreen = (width: number, fullScreenBreakpoint?: number) => {
  if (fullScreenBreakpoint) return width < fullScreenBreakpoint;

  return false;
};

/**
 * On width change, see if we should re-render
 */
const onChange = (fullScreenBreakpoint?: number) => (
  next: ISize,
  prev: ISize
) =>
  showFullScreen(next.width, fullScreenBreakpoint) !==
  showFullScreen(prev.width, fullScreenBreakpoint);

/**
 *  Displays a modal overlay
 */
const Modal = ({
  Component,
  props,
  hide,
  zIndex,
  fullScreenBreakpoint,
}: IProps) => (
  <Measure onChange={onChange(fullScreenBreakpoint)}>
    {({ width, measureProps }) => (
      <Container zIndex={zIndex} {...measureProps}>
        {showFullScreen(width, fullScreenBreakpoint) ? (
          <FullContent zIndex={zIndex}>
            <Component fullScreen {...props} />
          </FullContent>
        ) : (
          <React.Fragment>
            <Content
              zIndex={zIndex}
              fullScreenBreakpoint={fullScreenBreakpoint}
            >
              <Component fullScreen={false} {...props} />
            </Content>
            <Button
              noContent
              action={hide}
              analyticsAction="HIDE"
              analyticsCategory="MODAL"
              styles={BUTTON_STYLE}
            >
              {({ isHovering }) => (
                <Overlay zIndex={zIndex} isHovering={isHovering}>
                  {null}
                </Overlay>
              )}
            </Button>
          </React.Fragment>
        )}
      </Container>
    )}
  </Measure>
);

export default Modal;
