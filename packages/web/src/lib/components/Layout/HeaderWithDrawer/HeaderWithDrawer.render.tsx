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
  OverlayMenu,
} from './HeaderWithDrawer.style';

interface IProps {
  children: JSX.Element;
  showMenu: boolean;
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
  children, close, open, showMenu,
}: IProps) => (
  <Measure onChange={onChange}>
    {({ width, measureProps }) => (
      <Container {...measureProps}>
        <Header
          title="Header.Title"
          leftButton={{
            action: showMenu ? close : open,
            icon: Bars,
          }}
        />
        {showMenu &&
          (isDesktop(width) ? (
            <DesktopMenu>
              <Menu close={close} />
            </DesktopMenu>
          ) : (
            <Overlay>
              <OverlayMenu>
                <Menu close={close} />
              </OverlayMenu>
              <Button
                noContent
                action={close}
                analyticsAction="HIDE_MENU_FROM_BACKGROUND_PRESS"
                analyticsCategory="MENU"
                styles={{
                  backgroundColor: 'black',
                  bottom: 0,
                  left: 0,
                  opacity: 0.5,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 1,
                }}
              />
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
