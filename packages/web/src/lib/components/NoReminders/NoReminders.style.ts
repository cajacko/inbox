import { View } from 'src/components';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const ICON_SIZE = 60;

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${padding({ horizontal: 20 })}
`;

export const Heading = styled(View)`
  ${margin({ bottom: 20 })}
`;

export const Icon = styled(View)`
  ${margin({ bottom: 30 })}
`;
