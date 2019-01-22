import { View } from 'src/components';
// import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import unit from 'src/utils/unit';
import styled from 'styled-components';

interface IProps {
  height: number;
}

export const Container = styled(View)<IProps>`
  height: ${({ height }) => unit(height)};
  position: relative;
`;

export const Position = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
