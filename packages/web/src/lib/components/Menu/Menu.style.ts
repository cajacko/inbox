import { View } from 'src/components';
import { GREY_DARK, GREY_LIGHTER, SECONDARY_DARK } from 'src/lib/config/styles/colors';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const MENU_WIDTH = 300;
export const HEADER_COLOR = SECONDARY_DARK;
export const TEXT_COLOR = GREY_DARK;
const menuPadding = 14;

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  width: ${unit(MENU_WIDTH)};
`;

export const MenuItem = styled(View)``;

export const MenuItemInner = styled(View)<{ selected?: boolean }>`
  padding: ${unit(menuPadding)};
  ${({ selected }) => (selected ? `background-color: ${GREY_LIGHTER};` : '')}
  flex: 1;
`;

export const MenuIcon = styled(View)`
  margin-right: ${unit(menuPadding)};
`;

export const Header = styled(View)`
  background-color: ${HEADER_COLOR};
  flex-direction: column;
  padding: ${unit(menuPadding)};
`;

export const HeaderSpacing = styled(View)`
  margin-top: ${unit(menuPadding)};
`;
