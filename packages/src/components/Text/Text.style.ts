import { Type, TYPES } from 'src/lib/config/styles/text';
import textIconColor from 'src/lib/utils/textIconColor';
import { Text as UIText } from 'src/ui';
import styled from 'styled-components';

/**
 * Get the text style, default to body1
 */
const getStyle = (type?: Type) => (type && TYPES[type]) || TYPES.body1;

/**
 * Transform the actual text, uppercase etc
 */
export const transformText = (text: string, { type }: { type?: Type }) => {
  const { uppercase } = getStyle(type);

  let transformedText = text;

  if (uppercase) transformedText = transformedText.toUpperCase();

  return transformedText;
};

/**
 * Get the style to use for the text
 */
const getTextStyle = ({ type }: { type?: Type }) => {
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
    font-size: ${size};
    font-weight: ${fontWeight};
    letter-spacing: ${letterSpacing};

  `;
};

/**
 * Figure out the text alignment
 */
const textAlign = ({ center }: { center?: boolean }) => {
  if (!center) return '';

  return 'text-align: center;';
};

export const Text = styled(UIText)`
  ${getTextStyle};
  color: ${textIconColor};
  ${textAlign};
`;
