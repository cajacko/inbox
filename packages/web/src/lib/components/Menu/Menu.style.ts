import { View } from 'src/components';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const MENU_WIDTH = 300;

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  width: ${unit(MENU_WIDTH)};
`;
