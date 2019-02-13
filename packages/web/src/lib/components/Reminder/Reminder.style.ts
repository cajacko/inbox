import { View } from 'src/components';
import { GREY_LIGHTER, WHITE } from 'src/lib/config/styles/colors';
import border from 'src/lib/utils/applyBorder';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

const reminderSpacing = 16;

export const Container = styled(View)<{ isLast: boolean }>`
  position: relative;
  z-index: 2;
  ${({ isLast }) =>
    border(GREY_LIGHTER, 2, {
      bottom: !isLast,
    })}
  flex-direction: row;
`;

export const Inner = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  ${padding(reminderSpacing)}
`;

export const EditMenu = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${BACKGROUND_COLOR};
  z-index: 1;
  align-items: center;
  justify-content: center;
  ${padding({ horizontal: reminderSpacing })}
  ${border(GREY_LIGHTER, 1, {
    left: true,
  })}}
`;
