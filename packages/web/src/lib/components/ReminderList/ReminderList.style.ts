import { View } from 'src/components';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import border from 'src/lib/utils/applyBorder';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import shadow from 'src/lib/utils/shadow';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

export const Container = styled(View)`
  width: 100%;
  flex: 1;
`;

export const Inner = styled(View)`
  background-color: ${BACKGROUND_COLOR};
  ${shadow()}
  ${margin({ vertical: 40 })}
`;

export const Reminder = styled(View)<{ isLast: boolean }>`
  ${padding(16)}
  ${({ isLast }) =>
    border(GREY_LIGHTER, 2, {
      bottom: !isLast,
    })}
`;
