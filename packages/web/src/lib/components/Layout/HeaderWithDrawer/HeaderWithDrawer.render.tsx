import * as React from 'react';
import Bars from 'src/lib/assets/icons/Bars';
import Plus from 'src/lib/assets/icons/Plus';
import Button from 'src/lib/components/Button';
import Header from 'src/lib/components/Header';
import Measure from 'src/lib/components/Layout/Measure';
import Menu from 'src/lib/components/Menu';
import getButtonType from 'src/lib/utils/getButtonType';
import * as Style from './HeaderWithDrawer.style';

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
const isDesktop = (width: number) => width > Style.BREAKPOINT;

/**
 * Only re-render if the desktop view boundaries change
 */
const onChange = (next: { width: number }, last: { width: number }) =>
  isDesktop(next.width) !== isDesktop(last.width);

/**
 * Display the header, drawer and content
 */
const HeaderWithDrawer = (props: IProps) => {
  const menuProps = {
    backgroundColor: Style.BACKGROUND_COLOR,
    close: props.close,
    showTestID: props.showTestID,
  };

  return (
    <Measure onChange={onChange}>
      {({ width, measureProps }) => (
        <Style.Container {...measureProps}>
          <Style.HeaderContainer>
            <Header
              title="General.Title"
              leftButton={{
                action: props.menuIsOpen ? props.close : props.open,
                icon: Bars,
                testID: 'Menu__Button',
              }}
            />
          </Style.HeaderContainer>
          {props.renderMenu &&
            (isDesktop(width) ? (
              <Style.DesktopMenu style={{ left: props.menuLeft }}>
                <Menu {...menuProps} isDesktop />
              </Style.DesktopMenu>
            ) : (
              <Style.Overlay>
                <Style.OverlayMenu style={{ left: props.menuLeft }}>
                  <Menu {...menuProps} isDesktop={false} />
                </Style.OverlayMenu>
                <Style.OverlayButton
                  style={{
                    left: props.buttonLeft,
                    opacity: props.overlayOpacity,
                  }}
                >
                  <Button
                    noContent
                    action={props.close}
                    analyticsAction="HIDE_MENU_FROM_BACKGROUND_PRESS"
                    analyticsCategory="MENU"
                    testID="Menu__BackgroundButton"
                  >
                    {({ isHovering }) => (
                      <Style.OverlayButtonColor isHovering={isHovering} />
                    )}
                  </Button>
                </Style.OverlayButton>
              </Style.Overlay>
            ))}
          <Style.Content>
            <Style.ContentWrap>{props.children}</Style.ContentWrap>
          </Style.Content>
          <Style.AddButton>
            <Button
              testID="AddButton"
              icon={Plus}
              analyticsAction="ADD_BUTTON"
              analyticsCategory="ADD_BUTTON"
              type={getButtonType('CONTAINED_CIRCLE_ICON.SECONDARY')}
            />
          </Style.AddButton>
        </Style.Container>
      )}
    </Measure>
  );
};

export default HeaderWithDrawer;
