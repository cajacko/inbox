import * as React from 'react';
import { View } from 'src/components';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import Auth from 'src/modules/Auth';
import { version } from '../../../../package.json';

/**
 * Login scene
 */
const Login = () => (
  <View testID="Login">
    <Text
      text={{ _textFromConst: 'App logo' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
      testID="Login__AppLogo"
    />
    <Button
      text={{ _textFromConst: 'Login button' }}
      action={Auth.login}
      testID="Login__Button"
    />
    <Text
      text={{ _textFromConst: version }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
      testID="Login__VersionText"
    />
  </View>
);

export default Login;
