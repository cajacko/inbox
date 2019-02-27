import * as React from 'react';
import Button from 'src/lib/components/Button';
import HeaderStatus from 'src/lib/components/HeaderStatus';
import Text from 'src/lib/components/Text';
import { BackgroundColorVal } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import getButtonType from 'src/lib/utils/getButtonType';
import {
  Center,
  Container,
  ICON_SIZE,
  LeftButton,
  Status,
  Title,
} from './Header.style';

type Component = (props: { [key: string]: any }) => JSX.Element;

interface IProps {
  title: TextType;
  backgroundColor: BackgroundColorVal;
  leftButton?: {
    action: () => void;
    icon: Component;
    testID?: string;
  };
}

/**
 * The header component
 */
const Header = ({ leftButton, title, backgroundColor }: IProps) => {
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
          testID={leftButton.testID}
        >
          {({ isHovering }) => (
            <Center>
              <Icon
                size={ICON_SIZE}
                backgroundColor={backgroundColor}
                highlight={isHovering}
              />
            </Center>
          )}
        </Button>
      </LeftButton>
    );
  }

  return (
    <Container backgroundColor={backgroundColor}>
      {leftButtonComponent}

      <Title>
        <Text type="subtitle1" text={title} backgroundColor={backgroundColor} />
      </Title>
      <Status>
        <HeaderStatus backgroundColor={backgroundColor} />
      </Status>
    </Container>
  );
};

export default Header;
