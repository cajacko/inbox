import { View } from 'src/components';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import border from 'src/lib/utils/applyBorder';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

export const Container = styled(View)<{ isLast: boolean }>`
  position: relative;
  ${({ isLast }) =>
    border(GREY_LIGHTER, 2, {
      bottom: !isLast,
    })}
`;

export const Inner = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  ${padding(16)}
`;
