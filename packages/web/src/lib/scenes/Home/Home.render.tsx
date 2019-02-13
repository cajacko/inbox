import * as React from 'react';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
import ReminderList from 'src/lib/components/ReminderList';
import { Container } from './Home.style';

/**
 * Dummy home scene scene
 */
const Home = () => (
  <HeaderWithDrawer>
    <Container testID="Home">
      <ReminderList />
    </Container>
  </HeaderWithDrawer>
);

export default Home;
