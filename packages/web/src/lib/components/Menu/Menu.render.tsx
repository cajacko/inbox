/* eslint max-lines: 0 */
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Check from 'src/lib/assets/icons/Check';
import Clock from 'src/lib/assets/icons/Clock';
import Inbox from 'src/lib/assets/icons/Inbox';
import Redo from 'src/lib/assets/icons/Redo';
import SignOut from 'src/lib/assets/icons/SignOut';
import Times from 'src/lib/assets/icons/Times';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import * as colors from 'src/lib/config/styles/colors';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import * as Style from './Menu.style';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

export type ActiveKeys = 'inbox' | 'done' | 'snoozed' | 'repeated';
export type ActiveKey = ActiveKeys | null;

type MenuItemKeys = ActiveKeys | 'close' | 'logout';

interface IMenuItemProps {
  activeKey: ActiveKey;
  close: () => void;
}

interface IGetMenuItems extends IMenuItemProps, RouteComponentProps {}

export interface IContainerStateProps {
  name: string | null;
}

interface INonRouterProps extends IContainerStateProps, IMenuItemProps {
  showTestID?: boolean;
  isDesktop: boolean;
  backgroundColor: ColorVal;
}

interface IProps extends INonRouterProps, RouteComponentProps {}

type Component = (props: { [key: string]: any }) => JSX.Element;

interface IMenuItems {
  Icon: Component;
  action: () => void;
  analyticsAction: string;
  analyticsCategory: string;
  key: MenuItemKeys;
  selected?: boolean;
  text: TextType;
  iconColor: ColorVal;
  testID?: string;
}

/**
 * Push a route and close the menu
 */
const pushWithClose = (history: RouteComponentProps['history'], close: () => void, location: string) => () => {
  close();
  history.push(location);
};

/**
 * Get the menu items to show
 */
const getMenuItems = ({ close, history, activeKey }: IGetMenuItems): IMenuItems[] => {
  const menuItems: IMenuItems[] = [
    {
      Icon: Times,
      action: close,
      analyticsAction: 'CLOSE',
      analyticsCategory: 'MENU',
      iconColor: Style.TEXT_COLOR,
      key: 'close',
      selected: false,
      testID: 'Menu__CloseButton',
      text: 'Menu.HideMenu',
    },
    {
      Icon: Inbox,
      action: pushWithClose(history, close, '/'),
      analyticsAction: 'INBOX',
      analyticsCategory: 'MENU',
      iconColor: Style.INBOX_COLOR,
      key: 'inbox',
      selected: false,
      testID: 'Menu__InboxButton',
      text: 'Menu.NavItems.Inbox',
    },
    {
      Icon: Clock,
      action: pushWithClose(history, close, '/snoozed'),
      analyticsAction: 'SNOOZED',
      analyticsCategory: 'MENU',
      iconColor: Style.SNOOZED_COLOR,
      key: 'snoozed',
      selected: false,
      testID: 'Menu__SnoozedButton',
      text: 'Menu.NavItems.Snoozed',
    },
    {
      Icon: Redo,
      action: pushWithClose(history, close, '/repeated'),
      analyticsAction: 'REPEATED',
      analyticsCategory: 'MENU',
      iconColor: Style.REPEATED_COLOR,
      key: 'repeated',
      selected: false,
      testID: 'Menu__RepeatedButton',
      text: 'Menu.NavItems.Repeated',
    },
    {
      Icon: Check,
      action: pushWithClose(history, close, '/done'),
      analyticsAction: 'DONE',
      analyticsCategory: 'MENU',
      iconColor: Style.DONE_COLOR,
      key: 'done',
      selected: false,
      testID: 'Menu__DoneButton',
      text: 'Menu.NavItems.Done',
    },
    {
      Icon: SignOut,
      action: () => Auth.logout(true),
      analyticsAction: 'LOGOUT',
      analyticsCategory: 'MENU',
      iconColor: Style.TEXT_COLOR,
      key: 'logout',
      selected: false,
      testID: 'Menu__LogoutButton',
      text: 'Menu.Logout',
    },
  ];

  return menuItems.map((menuItem: IMenuItems) => ({
    ...menuItem,
    selected: menuItem.key === activeKey,
  }));
};

/**
 * Display the header, drawer and content
 */
const Menu = ({
  name,
  isDesktop,
  showTestID,
  backgroundColor,
  ...props
}: IProps) => {
  const headerBackgroundColor = isDesktop ? undefined : Style.HEADER_COLOR;
  const textBackgroundColor = headerBackgroundColor || backgroundColor;

  return (
    <Style.Container testID={showTestID ? 'Menu' : ''}>
      {(!isDesktop || name) && (
        <Style.Header backgroundColor={headerBackgroundColor}>
          {!isDesktop && (
            <Text
              type="h4"
              text="General.Title"
              backgroundColor={textBackgroundColor}
            />
          )}
          {name && (
            <React.Fragment>
              <Style.HeaderSpacing noSpacing={isDesktop}>
                <Text
                  type="subtitle1"
                  text="Menu.Welcome"
                  backgroundColor={textBackgroundColor}
                />
              </Style.HeaderSpacing>
              <Style.HeaderSpacing>
                <Text
                  type="subtitle2"
                  text={{ _textFromConst: name }}
                  backgroundColor={textBackgroundColor}
                />
              </Style.HeaderSpacing>
            </React.Fragment>
          )}
        </Style.Header>
      )}
      {getMenuItems(props).filter(({ key }) => !isDesktop || key !== 'close').map(({
 key, text, Icon, iconColor, selected, ...menuItems
}) => (
          <Style.MenuItem key={key}>
            <Button {...menuItems}>
              {({ isHovering }) => (
                <Style.MenuItemInner selected={isHovering || selected}>
                  <Style.MenuIcon>
                    <Icon size={20} _dangerouslySetColor={iconColor} />
                  </Style.MenuIcon>
                  <Text
                    text={text}
                    _dangerouslySetColor={selected ? iconColor : Style.TEXT_COLOR}
                  />
                </Style.MenuItemInner>
              )}
            </Button>
          </Style.MenuItem>
        ))}
    </Style.Container>
  );
};

export default withRouter<IProps>(Menu);
