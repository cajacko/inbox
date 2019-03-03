import { View } from 'src/components';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import applyPadding from 'src/lib/utils/applyPadding';
import shadow from 'src/lib/utils/shadow';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const ICON_SIZE = 24;
const HEADER_SPACING = Math.floor((ICON_SIZE / 3) * 2);
const totalHeaderSpacing = HEADER_SPACING * 2;
export const HEADER_HEIGHT = totalHeaderSpacing + ICON_SIZE;

export const Container = styled(View)<{ backgroundColor: BackgroundColorVal }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: ${unit(HEADER_HEIGHT)};
  flex-direction: row;
  ${shadow(undefined, 10)}
`;

export const LeftButton = styled(View)`
  height: ${unit(HEADER_HEIGHT)};
  width: ${unit(HEADER_HEIGHT)};
`;

export const Center = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Title = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  ${applyPadding({ left: HEADER_SPACING })}
`;

export const Status = styled(View)`
  height: ${unit(HEADER_HEIGHT)};
  width: ${unit(HEADER_HEIGHT)};
  align-items: center;
  justify-content: center;
`;