import { View } from 'src/components';
import {
  GREY_DARK,
  GREY_LIGHTER,
  SECONDARY_DARK,
} from 'src/lib/config/styles/colors';
import applyMargin from 'src/lib/utils/applyMargin';
import applyPadding from 'src/lib/utils/applyPadding';
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

export const MenuItem = styled(View)`
  flex-direction: row;
`;

export const MenuItemInner = styled(View)<{ selected?: boolean }>`
  ${applyPadding(menuPadding)}
  ${({ selected }) =>
    (selected ? `background-color: ${GREY_LIGHTER};` : '')}
  flex-direction: row;
  width: 100%;
`;

export const MenuIcon = styled(View)`
  ${applyMargin({ right: menuPadding })}
`;

export const Header = styled(View)`
  background-color: ${HEADER_COLOR};
  flex-direction: column;
  ${applyPadding(menuPadding)}
`;

export const HeaderSpacing = styled(View)`
  ${applyMargin({ top: menuPadding })}
`;
