import { View } from 'src/components';
import { HEADER_HEIGHT } from 'src/lib/components/Header/Header.style';
import { MENU_WIDTH } from 'src/lib/components/Menu/Menu.style';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import * as overlays from 'src/lib/config/styles/overlays';
import border from 'src/lib/utils/applyBorder';
import shadow from 'src/lib/utils/shadow';
import { View as AnimatedView } from 'src/packages/animated';
import unit from 'src/utils/unit';
import styled from 'styled-components';

const menuMargin = 20;
const addButtonMargin = menuMargin;

export const ANIMATION_DURATION = 300;

export const MAX_CONTENT_WIDTH = 600;
const menuWidthWithSpacing = MENU_WIDTH + menuMargin;
const balancedMenuWidth = menuWidthWithSpacing * 2;
export const BREAKPOINT = MAX_CONTENT_WIDTH + balancedMenuWidth;

export const BACKGROUND_COLOR = WHITE;

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const HeaderContainer = styled(View)`
  position: relative;
  z-index: 4;
`;

export const Overlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

export const OverlayMenu = styled(AnimatedView)`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 7;
  background-color: ${BACKGROUND_COLOR};
  ${shadow()}
  display: flex;
`;

export const OverlayButton = styled(AnimatedView)`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 6;
  display: flex;
`;

export const OverlayButtonColor = styled(View)<{ isHovering: boolean }>`
  background-color: ${overlays.BACKGROUND_COLOR};
  opacity: ${({ isHovering }) =>
    (isHovering
      ? overlays.BACKGROUND_OPACITY_HOVER
      : overlays.BACKGROUND_OPACITY)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content = styled(View)`
  flex: 1;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const ContentWrap = styled(View)`
  max-width: ${unit(MAX_CONTENT_WIDTH)};
  flex: 1;
  width: 100%;
`;

export const DesktopMenu = styled(AnimatedView)`
  position: absolute;
  top: ${unit(HEADER_HEIGHT)};
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 3;
  ${border(GREY_LIGHTER, 1)}
`;

export const AddButton = styled(View)`
  position: absolute;
  right: ${unit(addButtonMargin)};
  bottom: ${unit(addButtonMargin)};
  z-index: 2;
`;
