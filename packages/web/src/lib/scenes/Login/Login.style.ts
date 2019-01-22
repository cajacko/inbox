import { View } from 'src/components';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const Spacing = styled(View)`
  flex-direction: column;
  margin-bottom: ${unit(25)};
`;

export const Version = styled(View)`
  flex-direction: column;
  margin-top: ${unit(40)};
`;
