import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Check from 'src/lib/assets/icons/Check';
import Inbox from 'src/lib/assets/icons/Inbox';
import SignOut from 'src/lib/assets/icons/SignOut';
import Times from 'src/lib/assets/icons/Times';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import * as colors from 'src/lib/config/styles/colors';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import {
  Container,
  DONE_COLOR,
  Header,
  HEADER_COLOR,
  HeaderSpacing,
  INBOX_COLOR,
  MenuIcon,
  MenuItem,
  MenuItemInner,
  TEXT_COLOR,
} from './Menu.style';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

export type ActiveKeys = 'inbox' | 'done';
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
      iconColor: TEXT_COLOR,
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
      iconColor: INBOX_COLOR,
      key: 'inbox',
      selected: false,
      testID: 'Menu__InboxButton',
      text: 'Menu.NavItems.Inbox',
    },
    {
      Icon: Check,
      action: pushWithClose(history, close, '/done'),
      analyticsAction: 'DONE',
      analyticsCategory: 'MENU',
      iconColor: DONE_COLOR,
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
      iconColor: TEXT_COLOR,
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
  const headerBackgroundColor = isDesktop ? undefined : HEADER_COLOR;
  const textBackgroundColor = headerBackgroundColor || backgroundColor;

  return (
    <Container testID={showTestID ? 'Menu' : ''}>
      {(!isDesktop || name) && (
        <Header backgroundColor={headerBackgroundColor}>
          {!isDesktop && (
            <Text
              type="h4"
              text="General.Title"
              backgroundColor={textBackgroundColor}
            />
          )}
          {name && (
            <React.Fragment>
              <HeaderSpacing noSpacing={isDesktop}>
                <Text
                  type="subtitle1"
                  text="Menu.Welcome"
                  backgroundColor={textBackgroundColor}
                />
              </HeaderSpacing>
              <HeaderSpacing>
                <Text
                  type="subtitle2"
                  text={{ _textFromConst: name }}
                  backgroundColor={textBackgroundColor}
                />
              </HeaderSpacing>
            </React.Fragment>
          )}
        </Header>
      )}
      {getMenuItems(props).filter(({ key }) => !isDesktop || key !== 'close').map(({
 key, text, Icon, iconColor, selected, ...menuItems
}) => (
          <MenuItem key={key}>
            <Button {...menuItems}>
              {({ isHovering }) => (
                <MenuItemInner selected={isHovering || selected}>
                  <MenuIcon>
                    <Icon size={20} _dangerouslySetColor={iconColor} />
                  </MenuIcon>
                  <Text
                    text={text}
                    _dangerouslySetColor={selected ? iconColor : TEXT_COLOR}
                  />
                </MenuItemInner>
              )}
            </Button>
          </MenuItem>
        ))}
    </Container>
  );
};

export default withRouter<IProps>(Menu);
