import { View } from 'src/components';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const SUGGESTION_BACKGROUND = BACKGROUND_COLORS.WHITE;
export const FOOTER_BACKGROUND = BACKGROUND_COLORS.GREY_LIGHTER;
export const CHEVRON_SIZE = 14;

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

export const Suggestion = styled(Rows)`
  width: 50%;
`;

export const Footer = styled(Rows)`
  background-color: ${FOOTER_BACKGROUND};
`;

export const ConfirmContainer = styled(View)`
  ${padding(20)}
`;

export const ConfirmHeader = styled(View)`
  ${margin({ bottom: 10 })}
`;

const buttonWidth = 300;

export const ConfirmButton = styled(View)`
  width: ${unit(buttonWidth)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${padding({ vertical: 10 })}
`;

export const ConfirmRight = styled(View)`
  flex-direction: row;
  align-items: center;
  ${margin({ left: 10 })}
`;

export const ConfirmValue = styled(View)`
  ${margin({ right: 10 })}
`;

export const ConfirmSaveButton = styled(View)`
  align-items: center;
  justify-content: center;
  ${margin({ top: 10 })}
`;

export const TimeSuggestionsContainer = styled(View)``;

export const TimeSuggestion = styled(View)`
  width: ${unit(buttonWidth)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${padding(10)}
`;

export const Error = styled(View)`
  ${margin({ top: 10 })}
`;

export const BackButton = styled(View)`
  flex-direction: row;
`;
