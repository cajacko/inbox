import { View } from 'src/components';
import { GREY_LIGHT, GREY_LIGHTER } from 'src/lib/config/styles/colors';
import applyPadding from 'src/lib/utils/applyPadding';
import shadow from 'src/lib/utils/shadow';
import platform from 'src/utils/platform';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const LINK_HEIGHT = 100;

interface IProps {
  padding?: number;
}

interface IWrapperProps {
  isHovering: boolean;
}

export const buttonStyles = {
  flex: 1,
  maxWidth: unit(300),
};

export const Container = styled(View)<IProps>`
  height: ${unit(LINK_HEIGHT)};
  justify-content: center;
  ${({ padding }) => (padding ? applyPadding(padding) : '')}
  ${platform() === 'web' ? 'box-sizing: border-box;' : ''}
`;

export const Wrapper = styled(View)<IWrapperProps>`
  flex-direction: column;
  background-color: ${({ isHovering }) =>
    (isHovering ? GREY_LIGHT : GREY_LIGHTER)};
  justify-content: space-around;
  ${applyPadding(10)}
  flex: 1;
  ${shadow()}
  overflow: hidden;
`;
