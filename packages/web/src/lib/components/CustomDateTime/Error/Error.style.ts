import { View } from 'src/components';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const ConfirmContainer = styled(View)`
  ${padding(20)}
`;

export const Error = styled(View)`
  ${margin({ top: 10 })}
`;

export const BackButton = styled(View)`
  flex-direction: row;
`;
