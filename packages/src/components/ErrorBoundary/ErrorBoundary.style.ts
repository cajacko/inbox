import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { View } from 'src/ui';
import unit from 'src/unit';
import styled from 'styled-components';

const STANDARD_SPACING = 10;

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(View)`
  background-color: ${BACKGROUND_COLOR};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${unit(STANDARD_SPACING)};
  padding-vertical: ${unit(STANDARD_SPACING)};
  flex-direction: column;
`;

export const Inner = styled(View)`
  align-items: center;
  flex-direction: column;
`;

export const Button = styled(View)``;

export const BottomMargin = styled(View)<{ hasMargin: boolean }>`
  flex-direction: column;
  margin-bottom: ${({ hasMargin }) =>
    unit(hasMargin ? STANDARD_SPACING * 2 : 0)};
`;