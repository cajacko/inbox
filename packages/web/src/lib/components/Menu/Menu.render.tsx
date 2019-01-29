import * as React from 'react';
import { View } from 'src/components';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import Auth from 'src/lib/modules/Auth';
import getButtonType from 'src/lib/utils/getButtonType';
import { Container } from './Menu.style';

interface IProps {
  close: () => void;
}

/**
 * Display the header, drawer and content
 */
const Menu = ({ close }: IProps) => (
  <Container>
    <Button
      analyticsAction="CLOSE"
      analyticsCategory="MENU"
      text={{ _textFromConst: 'Close' }}
      action={close}
      type={getButtonType('CONTAINED.PRIMARY')}
    />
    <View>
      <Text
        text={{ _textFromConst: 'Logged in as: Charlie Jackson' }}
        backgroundColor={BACKGROUND_COLORS.WHITE}
      />
    </View>
    <Button
      analyticsAction="LOGOUT"
      analyticsCategory="MENU"
      text={{ _textFromConst: 'Logout' }}
      action={Auth.logout}
      type={getButtonType('CONTAINED.PRIMARY')}
    />
  </Container>
);

export default Menu;
