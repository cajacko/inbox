import { View } from 'src/components';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import border from 'src/lib/utils/applyBorder';
import padding from 'src/lib/utils/applyPadding';
import shadow from 'src/lib/utils/shadow';
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

  return border(GREY_LIGHTER, 1);
};

export const Container = styled(View)<{ fullScreen: boolean }>`
  ${({ fullScreen }) =>
    (fullScreen ? `flex: 1; background-color: ${GREY_LIGHTER};` : '')}
`;

export const Content = styled(View)<IContentProps>`
  ${({ fullScreen }) => (fullScreen ? shadow() : '')}
  background-color: ${BACKGROUND_COLOR};
`;

export const Panel = styled(View)<IContentProps>`
  ${padding(10)};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${BACKGROUND_COLOR};
  ${applyBorder}
`;

export const InputPanel = styled(View)`
  ${padding({ horizontal: 20, vertical: 10 })};
  background-color: ${BACKGROUND_COLOR};
  flex-direction: row;
`;

export const Input = styled(View)`
  flex: 1;
  justify-content: center;
`;
