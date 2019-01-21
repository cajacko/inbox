import * as React from 'react';
import { View } from 'src/components';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';

/**
 * Dummy home scene scene
 */
const Home = () => (
  <View testID="Home">
    <Text
      text={{ _textFromConst: 'Example home scene' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
    />
  </View>
);

export default Home;
