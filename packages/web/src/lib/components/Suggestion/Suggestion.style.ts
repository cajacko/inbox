import { View } from 'src/components';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const ICON_SIZE = 26;

export const Container = styled(View)<{ isHovering: boolean }>`
  align-items: center;
  flex: 1;
  ${padding(20)};
  opacity: ${({ isHovering }) => (isHovering ? 0.5 : 1)};
`;

export const IconWrapper = styled(View)`
  ${margin({ bottom: 10 })};
`;

export const SubTitle = styled(View)`
  ${margin({ top: 5 })};
`;
