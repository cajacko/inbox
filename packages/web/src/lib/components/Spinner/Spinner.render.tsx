import * as React from 'react';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';

interface IProps {
  testID?: string;
  text?: TextType;
}

/**
 * Generic spinner  component
 */
const Spinner = ({ testID, text }: IProps) => (
  <React.Fragment>
    <Text
      testID={testID || 'Spinner'}
      text={{ _textFromConst: 'Loading' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
    />
    {text && <Text text={text} backgroundColor={BACKGROUND_COLORS.WHITE} />}
  </React.Fragment>
);

export default Spinner;
