import { View } from 'src/components';
import { GREY_LIGHT } from 'src/lib/config/styles/colors';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import border from 'src/lib/utils/applyBorder';
import applyPadding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(View)<{ bound: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ bound }) =>
    (bound ? BACKGROUND_COLORS.GREY_LIGHTER : BACKGROUND_COLOR)};
`;

export const Box = styled(View)<{ bound: boolean }>`
  max-width: ${unit(450)};
  flex-direction: column;
  background-color: ${({ bound }) =>
    (bound ? BACKGROUND_COLOR : 'transparent')};
  ${applyPadding(20)}
  ${({ bound }) => border(GREY_LIGHT, bound ? 1 : 0)}
  border-radius: ${unit(10)};
`;
