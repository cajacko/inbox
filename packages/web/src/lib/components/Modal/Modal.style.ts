import { View } from 'src/components';
import { WHITE } from 'src/lib/config/styles/colors';
import {
  BACKGROUND_COLOR,
  BACKGROUND_OPACITY,
  BACKGROUND_OPACITY_HOVER,
} from 'src/lib/config/styles/overlays';
import margin from 'src/lib/utils/applyMargin';
import shadow from 'src/lib/utils/shadow';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const FULL_SCREEN_BREAKPOINT = 800;

const overlayMargin = 40;
const overlayTotalMargin = overlayMargin * 2;
const overlayContentWidth = FULL_SCREEN_BREAKPOINT - overlayTotalMargin;

export const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  align-items: center;
`;

export const Overlay = styled(View)<{ isHovering: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${BACKGROUND_COLOR};
  opacity: ${({ isHovering }) =>
    (isHovering ? BACKGROUND_OPACITY_HOVER : BACKGROUND_OPACITY)};
  z-index: 901;
`;

export const Content = styled(View)`
  position: relative;
  z-index: 902;
  width: ${unit(overlayContentWidth)};
  ${margin({ horizontal: overlayMargin, top: overlayMargin })}
  background-color: ${WHITE};
  ${shadow()}
`;

export const FullContent = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${WHITE};
  z-index: 902;
`;
