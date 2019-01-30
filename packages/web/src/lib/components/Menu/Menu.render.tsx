import * as React from 'react';
import SignOut from 'src/lib/assets/icons/SignOut';
import Times from 'src/lib/assets/icons/Times';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import * as colors from 'src/lib/config/styles/colors';
import Auth from 'src/lib/modules/Auth';
import { Text as TextType } from 'src/lib/types/general';
import {
  Container,
  Header,
  HEADER_COLOR,
  HeaderSpacing,
  MenuIcon,
  MenuItem,
  MenuItemInner,
  TEXT_COLOR,
} from './Menu.style';

export type ColorKey = keyof typeof colors;
export type ColorVal = typeof colors[ColorKey];

interface IMenuItemProps {
  close: () => void;
}

export interface IContainerStateProps {
  name: string | null;
}

interface IProps extends IContainerStateProps, IMenuItemProps {}

type Component = (props: { [key: string]: any }) => JSX.Element;

interface IMenuItems {
  Icon: Component;
  action: () => void;
  analyticsAction: string;
  analyticsCategory: string;
  key: string;
  selected?: boolean;
  text: TextType;
  iconColor: ColorVal;
}

/**
 * Get the menu items to show
 */
const getMenuItems = ({ close }: IMenuItemProps): IMenuItems[] => [
  {
    Icon: Times,
    action: close,
    analyticsAction: 'CLOSE',
    analyticsCategory: 'MENU',
    iconColor: TEXT_COLOR,
    key: 'close',
    selected: false,
    text: 'Menu.HideMenu',
  },
  {
    Icon: SignOut,
    action: Auth.logout,
    analyticsAction: 'LOGOUT',
    analyticsCategory: 'MENU',
    iconColor: TEXT_COLOR,
    key: 'logout',
    selected: false,
    text: 'Menu.Logout',
  },
];

/**
 * Display the header, drawer and content
 */
const Menu = ({ name, ...props }: IProps) => (
  <Container>
    <Header>
      <Text type="h4" text="General.Title" backgroundColor={HEADER_COLOR} />
      {name && (
        <React.Fragment>
          <HeaderSpacing>
            <Text
              type="subtitle1"
              text="Menu.Welcome"
              backgroundColor={HEADER_COLOR}
            />
          </HeaderSpacing>
          <HeaderSpacing>
            <Text
              type="subtitle2"
              text={{ _textFromConst: name }}
              backgroundColor={HEADER_COLOR}
            />
          </HeaderSpacing>
        </React.Fragment>
      )}
    </Header>
    {getMenuItems(props).map(({
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

export default Menu;
