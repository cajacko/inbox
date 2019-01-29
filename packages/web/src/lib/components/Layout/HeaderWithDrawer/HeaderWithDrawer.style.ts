import { View } from 'src/components';
import { HEADER_HEIGHT } from 'src/lib/components/Header/Header.style';
import { MENU_WIDTH } from 'src/lib/components/Menu/Menu.style';
import shadow from 'src/lib/utils/shadow';
import unit from 'src/utils/unit';
import styled from 'styled-components';

const menuMargin = 20;

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
`;

export const OverlayMenu = styled(View)`
  position: relative;
  z-index: 2;
  background-color: white;
  ${shadow()}
`;

export const ContentWrap = styled(View)`
  max-width: ${unit(MAX_CONTENT_WIDTH)};
  flex: 1;
`;

export const Content = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const DesktopMenu = styled(View)`
  position: absolute;
  top: ${unit(HEADER_HEIGHT)};
  bottom: 0;
  left: 0;
`;
