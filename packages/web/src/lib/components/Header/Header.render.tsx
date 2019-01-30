import * as React from 'react';
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

type Component = (props: { [key: string]: any }) => JSX.Element;

interface IProps {
  title: TextType;
  leftButton?: {
    action: () => void;
    icon: Component;
  };
}

/**
 * The header component
 */
const Header = ({ leftButton, title }: IProps) => {
  let leftButtonComponent;

  if (leftButton) {
    const Icon = leftButton.icon;

    leftButtonComponent = (
      <LeftButton>
        <Button
          type={getButtonType('ICON.DEFAULT')}
          action={leftButton.action}
          analyticsAction="SHOW_MENU"
          analyticsCategory="HEADER"
        >
          {({ isHovering }) => (
            <Center>
              <Icon
                size={ICON_SIZE}
                backgroundColor={BACKGROUND_COLOR}
                highlight={isHovering}
              />
            </Center>
          )}
        </Button>
      </LeftButton>
    );
  }

  return (
    <Container>
      {leftButtonComponent}

      <Title>
        <Text
          type="subtitle1"
          text={title}
          backgroundColor={BACKGROUND_COLOR}
        />
      </Title>
    </Container>
  );
};

export default Header;
