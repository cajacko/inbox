import * as React from 'react';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';

/**
 * Show the repeat forms
 */
const Repeat = () => (
  <Text
    text={{ _textFromConst: 'Repeat' }}
    backgroundColor={BACKGROUND_COLORS.WHITE}
  />
);

export default Repeat;
