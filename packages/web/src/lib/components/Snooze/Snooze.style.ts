import { View } from 'src/components';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const SUGGESTION_BACKGROUND = BACKGROUND_COLORS.WHITE;
export const FOOTER_BACKGROUND = BACKGROUND_COLORS.GREY_LIGHTER;

const width = 350;

export const Container = styled(View)`
  width: ${unit(width)};
`;

const Rows = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Suggestions = styled(Rows)`
  background-color: ${SUGGESTION_BACKGROUND};
`;

export const SuggestionContainer = styled(Rows)`
  width: 50%;
`;

export const Footer = styled(Rows)`
  background-color: ${FOOTER_BACKGROUND};
`;
