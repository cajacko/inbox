import { View } from 'src/components';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import padding from 'src/lib/utils/applyPadding';
import shadow from 'src/lib/utils/shadow';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

interface IContentProps {
  fullScreen: boolean;
}

/**
 * Apply the border if necessary
 */
const applyBorder = ({ fullScreen }: IContentProps) => {
  if (!fullScreen) return '';

  return `
    border-bottom-style: solid;
    border-bottom-width: ${unit(1)};
    border-bottom-color: ${GREY_LIGHTER}
  `;
};

export const Container = styled(View)<{ fullScreen: boolean }>`
  ${({ fullScreen }) =>
    (fullScreen ? `flex: 1; background-color: ${GREY_LIGHTER};` : '')}
`;

export const Content = styled(View)<IContentProps>`
  ${({ fullScreen }) => (fullScreen ? shadow() : '')}
`;

export const Panel = styled(View)<IContentProps>`
  ${padding(10)};
  justify-content: space-between;
  flex-direction: row;
  background-color: ${BACKGROUND_COLOR};
  ${applyBorder}
`;

export const InputPanel = styled(View)`
  ${padding(20)};
  background-color: ${BACKGROUND_COLOR};
`;

export const Input = styled(View)`
  flex: 1;
  justify-content: center;
  padding-left: ${unit(10)};
`;
