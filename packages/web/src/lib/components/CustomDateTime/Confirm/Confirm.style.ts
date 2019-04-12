import { View } from 'src/components';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import styled from 'styled-components';

export const ConfirmContainer = styled(View)`
  ${padding(20)}
`;

export const ConfirmHeader = styled(View)`
  ${margin({ bottom: 10 })}
`;

export const ConfirmSaveButton = styled(View)`
  align-items: center;
  justify-content: center;
  ${margin({ top: 10 })}
`;
