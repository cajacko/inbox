import * as React from 'react';
import HeaderWithDrawer from 'src/lib/components/Layout/HeaderWithDrawer';
import ReminderList from 'src/lib/components/ReminderList';
import { Container } from './Home.style';

interface IRenderProps {
  addButtonSpacing: number;
  maxContentWidth: number;
  isFullWidth: boolean;
}

/**
 * Dummy home scene scene
 */
const Home = () => (
  <HeaderWithDrawer>
    {({ addButtonSpacing, maxContentWidth, isFullWidth }: IRenderProps) => (
      <Container testID="Home">
        <ReminderList
          list="INBOX"
          isFullWidth={isFullWidth}
          bottomMargin={addButtonSpacing}
          maxContentWidth={maxContentWidth}
        />
      </Container>
    )}
  </HeaderWithDrawer>
);

export default Home;
