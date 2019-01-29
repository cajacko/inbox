import { View } from 'src/components';
import { HEADER_HEIGHT } from 'src/lib/components/Header/Header.style';
import { MENU_WIDTH } from 'src/lib/components/Menu/Menu.style';
import { BLACK, WHITE } from 'src/lib/config/styles/colors';
import shadow from 'src/lib/utils/shadow';
import { View as AnimatedView } from 'src/packages/animated';
import unit from 'src/utils/unit';
import styled from 'styled-components';

const menuMargin = 20;

export const ANIMATION_DURATION = 300;

export const MAX_CONTENT_WIDTH = 600;
export const BREAKPOINT = MAX_CONTENT_WIDTH + (MENU_WIDTH + menuMargin) * 2;

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const Overlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

export const OverlayMenu = styled(AnimatedView)`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
  background-color: ${WHITE};
  ${shadow()}
`;

export const OverlayButton = styled(AnimatedView)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
  display: flex;
`;

export const overlayButtonStyle = {
  backgroundColor: BLACK,
  flex: 1,
  opacity: 0.5,
};

export const ContentWrap = styled(View)`
  max-width: ${unit(MAX_CONTENT_WIDTH)};
  flex: 1;
`;

export const Content = styled(View)`
  flex: 1;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

export const DesktopMenu = styled(AnimatedView)`
  position: absolute;
  top: ${unit(HEADER_HEIGHT)};
  bottom: 0;
  left: 0;
`;
