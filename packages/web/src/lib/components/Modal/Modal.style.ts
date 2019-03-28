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

const overlayMargin = 40;
const overlayTotalMargin = overlayMargin * 2;

/**
 * Get the overlay content width
 */
const overlayContentWidth = (fullScreenBreakpoint?: number) => {
  if (!fullScreenBreakpoint) return '';

  return `width: ${unit(fullScreenBreakpoint - overlayTotalMargin)};`;
};

/**
 * Get the zIndex for the component
 */
const getZIndex = (componentOrder: number) => ({
  zIndex,
}: {
  zIndex: number;
  }) => {
  const from = 500;
  const modalModifier = zIndex * 100;

  return from + modalModifier + componentOrder;
};

export const BUTTON_STYLE: React.CSSProperties = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

export const Container = styled(View)<{ zIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${getZIndex(1)};
  align-items: center;
`;

export const Overlay = styled(View)<{ isHovering: boolean; zIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${BACKGROUND_COLOR};
  opacity: ${({ isHovering }) =>
    (isHovering ? BACKGROUND_OPACITY_HOVER : BACKGROUND_OPACITY)};
  z-index: ${getZIndex(2)};
`;

interface IProps {
  zIndex: number;
  fullScreenBreakpoint?: number;
}

export const Content = styled(View)<IProps>`
  position: relative;
  z-index: ${getZIndex(3)};
  ${({ fullScreenBreakpoint }) => overlayContentWidth(fullScreenBreakpoint)}
  ${margin({ horizontal: overlayMargin, top: overlayMargin })}
  background-color: ${WHITE};
  ${shadow()}
`;

export const FullContent = styled(View)<{ zIndex: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${WHITE};
  z-index: ${getZIndex(3)};
`;
