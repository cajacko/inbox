import * as React from 'react';
import { View } from 'src/components';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import Auth from 'src/lib/modules/Auth';
import getButtonType from 'src/lib/utils/getButtonType';

interface IProps {
  displayName: string | null;
}

/**
 * Dummy home scene scene
 */
const Home = ({ displayName }: IProps) => (
  <View testID="Home">
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
  </View>
);

export default Home;
