import * as React from 'react';
import Button from 'src/lib/components/Button';
import Header from 'src/lib/components/Header';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import Auth from 'src/lib/modules/Auth';
import getButtonType from 'src/lib/utils/getButtonType';
import { Container } from './Home.style';

interface IProps {
  displayName: string | null;
}

/**
 * Dummy home scene scene
 */
const Home = ({ displayName }: IProps) => (
  <Container testID="Home">
    <Header title="Header.Title" />
    <Text
      text={{ _textFromConst: displayName || 'No display name' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
    />
    <Button
      analyticsAction="LOGOUT"
      analyticsCategory="HOME"
      text={{ _textFromConst: 'Logout' }}
      action={Auth.logout}
      type={getButtonType('CONTAINED.PRIMARY')}
    />
  </Container>
);

export default Home;
