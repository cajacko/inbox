import { View } from 'src/components';
// import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const Container = styled(View)`
  height: ${unit(80)};
  position: relative;
`;

export const Position = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const SpinnerContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;
