import { View } from 'src/components';
import { WHITE } from 'src/lib/config/styles/colors';
import margin from 'src/lib/utils/applyMargin';
import shadow from 'src/lib/utils/shadow';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

export const Container = styled(View)`
  width: 100%;
  flex: 1;
`;

export const Inner = styled(View)`
  background-color: ${BACKGROUND_COLOR};
  ${shadow()}
  ${margin({ vertical: 40 })}
`;
