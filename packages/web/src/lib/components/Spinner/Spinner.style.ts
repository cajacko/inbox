import { View } from 'src/components';
import applyMargin from 'src/lib/utils/applyMargin';
import styled from 'styled-components';

export const Container = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled(View)`
  ${applyMargin({ top: 20 })}
`;
