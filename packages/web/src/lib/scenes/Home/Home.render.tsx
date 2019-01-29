import * as React from 'react';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Container } from './Home.style';

interface IProps {
  displayName: string | null;
}

/**
 * Dummy home scene scene
 */
const Home = ({ displayName }: IProps) => (
  <HeaderWithDrawer>
    <Container testID="Home">
      <Text
        text={{ _textFromConst: displayName || 'No display name' }}
        backgroundColor={BACKGROUND_COLORS.WHITE}
      />
    </Container>
  </HeaderWithDrawer>
);

export default Home;
