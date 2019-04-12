import { View } from 'src/components';
import { GREY_LIGHTER } from 'src/lib/config/styles/colors';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import border from 'src/lib/utils/applyBorder';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

interface IEditMenuProps {
  hasLink: boolean;
  reminderSpacing: number;
  backgroundColor: BackgroundColorVal;
}

export const Container = styled(View)<IEditMenuProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${({ reminderSpacing }) => padding({ horizontal: reminderSpacing })}
  ${({ hasLink }) =>
    border(GREY_LIGHTER, 1, {
      bottom: hasLink,
      left: true,
    })}}
`;
