import * as React from 'react';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
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
      <React.Fragment />
    </Container>
  </HeaderWithDrawer>
);

export default Home;
