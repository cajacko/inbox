import { TextInput } from 'src/components';
import { BUTTON_BORDER_RADIUS } from 'src/lib/config/styles/buttons';
import { GREY } from 'src/lib/config/styles/colors';
import { STANDARD_SPACING } from 'src/lib/config/styles/spacing';
import { InputType } from 'src/lib/config/styles/text';
import { COLORS_FOR_BACKGROUND } from 'src/lib/config/styles/textIconColors';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import applyPadding from 'src/lib/utils/applyPadding';
import getInputStyles from 'src/lib/utils/getInputStyles';
import textIconColor from 'src/lib/utils/textIconColor';
import unit from 'src/utils/unit';
import styled from 'styled-components';

interface IProps {
  customProps: {
    type?: InputType;
    error?: boolean;
    backgroundColor: BackgroundColorVal;
  };
}

/**
 * Get the font size and height from the input type
 */
const getStyles = ({ customProps: { type } }: IProps) => {
  const { size } = getInputStyles(type);

  const spacing = STANDARD_SPACING * 3;

  return {
    fontSize: unit(size),
    height: unit(size + spacing),
  };
};

/**
 * Get the border color, if there's an error then get the error
 * colour for the background
 */
const borderColor = ({ customProps: { error, backgroundColor } }: IProps) => {
  const errorColor = COLORS_FOR_BACKGROUND[backgroundColor].error;

  if (error && errorColor) {
    return errorColor;
  }

  return GREY;
};

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const Input = styled(TextInput)<IProps>`
  font-size: ${props => getStyles(props).fontSize};
  color: ${({ customProps: { backgroundColor } }) =>
    textIconColor({ backgroundColor })};
  border-radius: ${unit(BUTTON_BORDER_RADIUS)};
  box-sizing: border-box;
  height: ${props => getStyles(props).height};
  outline: none;
  width: 100%;
  ${applyPadding({ horizontal: STANDARD_SPACING, vertical: 0 })}
  border-color: ${borderColor};
  border-width: ${unit(0)};
`;
