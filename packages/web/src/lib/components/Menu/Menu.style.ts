import { View } from 'src/components';
import {
  GREEN_DARK,
  GREY_DARK,
  GREY_LIGHTER,
  ORANGE_DARK,
  PRIMARY_DARK,
  SECONDARY_DARK,
} from 'src/lib/config/styles/colors';
import applyMargin from 'src/lib/utils/applyMargin';
import applyPadding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const MENU_WIDTH = 300;
export const HEADER_COLOR = SECONDARY_DARK;
export const TEXT_COLOR = GREY_DARK;
export const DONE_COLOR = GREEN_DARK;
export const INBOX_COLOR = PRIMARY_DARK;
export const SNOOZED_COLOR = ORANGE_DARK;

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

export const Header = styled(View)<{ backgroundColor?: string }>`
  ${({ backgroundColor }) =>
    (backgroundColor ? `background-color: ${backgroundColor};` : '')}
  flex-direction: column;
  ${applyPadding(menuPadding)}
`;

export const HeaderSpacing = styled(View)<{ noSpacing?: boolean }>`
  ${({ noSpacing }) => applyMargin({ top: noSpacing ? 0 : menuPadding })}
`;