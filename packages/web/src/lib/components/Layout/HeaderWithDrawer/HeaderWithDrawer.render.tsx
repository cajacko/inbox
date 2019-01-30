import * as React from 'react';
import Bars from 'src/lib/assets/icons/Bars';
import Button from 'src/lib/components/Button';
import Header from 'src/lib/components/Header';
import Measure from 'src/lib/components/Layout/Measure';
import Menu from 'src/lib/components/Menu';
import {
  BACKGROUND_COLOR,
  BREAKPOINT,
  Container,
  Content,
  ContentWrap,
  DesktopMenu,
  HeaderContainer,
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
  buttonLeft: Animated.Value;
  overlayOpacity: Animated.Value;
  close: () => void;
  open: () => void;
  showTestID: boolean;
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
  buttonLeft,
  overlayOpacity,
  showTestID,
}: IProps) => {
  const menuProps = {
    backgroundColor: BACKGROUND_COLOR,
    close,
    showTestID,
  };

  return (
    <Measure onChange={onChange}>
      {({ width, measureProps }) => (
        <Container {...measureProps}>
          <HeaderContainer>
            <Header
              title="General.Title"
              leftButton={{
                action: menuIsOpen ? close : open,
                icon: Bars,
                testID: 'Menu__Button',
              }}
            />
          </HeaderContainer>
          {renderMenu &&
            (isDesktop(width) ? (
              <DesktopMenu style={{ left: menuLeft }}>
                <Menu {...menuProps} isDesktop />
              </DesktopMenu>
            ) : (
              <Overlay>
                <OverlayMenu style={{ left: menuLeft }}>
                  <Menu {...menuProps} isDesktop={false} />
                </OverlayMenu>
                <OverlayButton
                  style={{ opacity: overlayOpacity, left: buttonLeft }}
                >
                  <Button
                    noContent
                    action={close}
                    analyticsAction="HIDE_MENU_FROM_BACKGROUND_PRESS"
                    analyticsCategory="MENU"
                    testID="Menu__BackgroundButton"
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
};

export default HeaderWithDrawer;
