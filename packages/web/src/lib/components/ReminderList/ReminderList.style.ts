import { View } from 'src/components';
import { WHITE } from 'src/lib/config/styles/colors';
import { shadowObj } from 'src/lib/utils/shadow';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;

/**
 * The scroll view content inset
 */
export const contentInset = (bottomMargin?: number) => ({
  bottom: bottomMargin ? unit(bottomMargin) : undefined,
  top: unit(20),
});

/**
 * Get the content container styles to apply
 */
export const contentContainerStyle = (
  hasShadow: boolean,
  maxContentWidth?: number
) => {
  const shadow = hasShadow ? shadowObj() : {};

  return {
    backgroundColor: BACKGROUND_COLOR,
    maxWidth: maxContentWidth && unit(maxContentWidth),
    width: '100%',
    ...shadow,
  };
};

export const Container = styled(View)`
  width: 100%;
  flex: 1;
`;
