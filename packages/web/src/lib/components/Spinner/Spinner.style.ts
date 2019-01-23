import { View } from 'src/components';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const Container = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled(View)`
  margin-top: ${unit(20)};
`;
