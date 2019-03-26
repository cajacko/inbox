import { View } from 'src/components';
import padding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

const buttonWidth = 300;

export const Container = styled(View)`
  ${padding(10)}
`;

export const Header = styled(View)``;

export const Suggestion = styled(View)`
  width: ${unit(buttonWidth)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${padding(10)}
`;
