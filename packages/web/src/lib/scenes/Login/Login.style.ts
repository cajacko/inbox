import { View } from 'src/components';
import applyMargin from 'src/lib/utils/applyMargin';
import styled from 'styled-components';

export const Spacing = styled(View)<{ center?: boolean }>`
  flex-direction: column;
  ${applyMargin({ bottom: 25 })}
  ${({ center }) => (center ? 'align-items: center' : '')}
`;

export const Version = styled(View)`
  flex-direction: column;
  ${applyMargin({ top: 40 })}
`;
