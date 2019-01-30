import * as React from 'react';
import Bars from 'src/lib/assets/icons/Bars';
import Button from 'src/lib/components/Button';
import Header from 'src/lib/components/Header';
import Measure from 'src/lib/components/Layout/Measure';
import Menu from 'src/lib/components/Menu';
import {
  BREAKPOINT,
  Container,
  Content,
  ContentWrap,
  DesktopMenu,
  Overlay,
  OverlayButton,
  OverlayButtonColor,
  OverlayMenu,
} from './HeaderWithDrawer.style';

interface IProps {
  children: JSX.Element;
  renderMenu: boolean;
  menuIsOpen: boolean;
  menuLeft: Animated.Value;
  overlayOpacity: Animated.Value;
  close: () => void;
  open: () => void;
}

/**
 * Whether to show the desktop view or not
 */
const isDesktop = (width: number) => width > BREAKPOINT;

/**
 * Only re-render if the desktop view boundaries change
 */
const onChange = (next: { width: number }, last: { width: number }) =>
  isDesktop(next.width) !== isDesktop(last.width);

/**
 * Display the header, drawer and content
 */
const HeaderWithDrawer = ({
  children,
  close,
  open,
  renderMenu,
  menuIsOpen,
  menuLeft,
  overlayOpacity,
}: IProps) => (
  <Measure onChange={onChange}>
    {({ width, measureProps }) => (
      <Container {...measureProps}>
        <Header
          title="General.Title"
          leftButton={{
            action: menuIsOpen ? close : open,
            icon: Bars,
          }}
        />
        {renderMenu &&
          (isDesktop(width) ? (
            <DesktopMenu style={{ left: menuLeft }}>
              <Menu close={close} />
            </DesktopMenu>
          ) : (
            <Overlay>
              <OverlayMenu style={{ left: menuLeft }}>
                <Menu close={close} />
              </OverlayMenu>
              <OverlayButton style={{ opacity: overlayOpacity }}>
                <Button
                  noContent
                  action={close}
                  analyticsAction="HIDE_MENU_FROM_BACKGROUND_PRESS"
                  analyticsCategory="MENU"
                >
                  {({ isHovering }) => (
                    <OverlayButtonColor isHovering={isHovering} />
                  )}
                </Button>
              </OverlayButton>
            </Overlay>
          ))}
        <Content>
          <ContentWrap>{children}</ContentWrap>
        </Content>
      </Container>
    )}
  </Measure>
);

export default HeaderWithDrawer;
