import * as React from 'react';
import Bars from 'src/lib/assets/icons/Bars';
import Button from 'src/lib/components/Button';
import Text from 'src/lib/components/Text';
import { Text as TextType } from 'src/lib/types/general';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  BACKGROUND_COLOR,
  Center,
  Container,
  ICON_SIZE,
  LeftButton,
  Title,
} from './Header.style';

interface IProps {
  title: TextType;
}

const action = () => {
  console.debug('menu');
};

/**
 * The header component
 */
const Header = ({ title }: IProps) => (
  <Container>
    <LeftButton>
      <Button
        type={getButtonType('ICON.DEFAULT')}
        action={action}
        analyticsAction="SHOW_MENU"
        analyticsCategory="HEADER"
      >
        <Center>
          <Bars size={ICON_SIZE} backgroundColor={BACKGROUND_COLOR} />
        </Center>
      </Button>
    </LeftButton>
    <Title>
      <Text type="subtitle1" text={title} backgroundColor={BACKGROUND_COLOR} />
    </Title>
  </Container>
);

export default Header;
