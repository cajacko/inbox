import * as React from 'react';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
import { Container } from './Home.style';

/**
 * Dummy home scene scene
 */
const Home = () => (
  <HeaderWithDrawer>
    <Container testID="Home">
      <React.Fragment />
    </Container>
  </HeaderWithDrawer>
);

export default Home;
