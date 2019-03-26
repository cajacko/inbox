import { View } from 'src/components';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const CHEVRON_SIZE = 14;

const buttonWidth = 300;

export const Container = styled(View)`
  width: ${unit(buttonWidth)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${padding({ vertical: 10 })}
`;

export const Right = styled(View)`
  flex-direction: row;
  align-items: center;
  ${margin({ left: 10 })}
`;
