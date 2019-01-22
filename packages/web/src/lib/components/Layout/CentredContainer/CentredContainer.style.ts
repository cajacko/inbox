import { View } from 'src/components';
import { GREY_LIGHT } from 'src/lib/config/styles/colors';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${BACKGROUND_COLORS.GREY_LIGHTER};
`;

export const Box = styled(View)`
  max-width: ${unit(450)};
  flex-direction: column;
  background-color: ${BACKGROUND_COLOR};
  padding-left: ${unit(20)};
  padding-right: ${unit(20)};
  padding-bottom: ${unit(20)};
  padding-top: ${unit(20)};
  border-width: ${unit(1)};
  border-style: solid;
  border-radius: ${unit(10)};
  border-color: ${GREY_LIGHT};
`;
