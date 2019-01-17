import { Type, TYPES } from 'src/lib/config/styles/text';
import textIconColor from 'src/lib/utils/textIconColor';
import { Text as UIText } from 'src/ui';
import unit from 'src/unit';
import styled from 'styled-components';
import { IProps } from './Text.render';

/**
 * Get the text style, default to body1
 */
const getStyle = (type?: Type) => (type && TYPES[type]) || TYPES.body1;

/**
 * Transform the actual text, uppercase etc
 */
export const transformText = (text: string, { type }: IProps) => {
  const { uppercase } = getStyle(type);

  let transformedText = text;

  if (uppercase) transformedText = transformedText.toUpperCase();

  return transformedText;
};

/**
 * Get the style to use for the text
 */
const getTextStyle = ({ type }: IProps) => {
  const { size, weight, letterSpacing } = getStyle(type);

  let fontWeight;

  switch (weight) {
    case 'light':
      fontWeight = 200;
      break;
    case 'medium':
      fontWeight = 600;
      break;
    default:
      fontWeight = 400;
      break;
  }

  return `
    font-size: ${unit(size)};
    font-weight: ${fontWeight};
    letter-spacing: ${unit(letterSpacing)};
  `;
};

/**
 * Figure out the text alignment
 */
const textAlign = ({ center }: IProps) => {
  if (!center) return '';

  return 'text-align: center;';
};

export const Text = styled(UIText)<IProps>`
  ${getTextStyle};
  color: ${textIconColor};
  ${textAlign};
`;
