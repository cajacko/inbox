import { View } from 'src/components';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import applyMargin from 'src/lib/utils/applyMargin';
import applyPadding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

const STANDARD_SPACING = 10;

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(View)`
  background-color: ${BACKGROUND_COLOR};
  flex: 1;
  align-items: center;
  justify-content: center;
  ${applyPadding(STANDARD_SPACING)}
  flex-direction: column;
`;

export const Inner = styled(View)`
  align-items: center;
  flex-direction: column;
`;

export const Buttons = styled(View)``;

export const Button = styled(View)``;

export const BottomMargin = styled(View)<{ hasMargin: boolean }>`
  flex-direction: column;
  ${({ hasMargin }) =>
    applyMargin({ bottom: hasMargin ? STANDARD_SPACING * 2 : 0 })}
`;
