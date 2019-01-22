import * as React from 'react';
import { View } from 'src/components';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { version } from '../../../../package.json';

interface IProps {
  login: () => void;
  errorText?: TextType;
}

/**
 * Login scene
 */
const Login = ({ errorText, login }: IProps) => (
  <View testID="Login">
    <Text
      text={{ _textFromConst: 'App logo' }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
      testID="Login__AppLogo"
    />
    <Button
      text={{ _textFromConst: 'Login button' }}
      action={login}
      testID="Login__Button"
    />
    {errorText && (
      <Text
        text={errorText}
        backgroundColor={BACKGROUND_COLORS.WHITE}
        testID="Login__ErrorText"
      />
    )}

    <Text
      text={{ _textFromConst: version }}
      backgroundColor={BACKGROUND_COLORS.WHITE}
      testID="Login__VersionText"
    />
  </View>
);

export default Login;
