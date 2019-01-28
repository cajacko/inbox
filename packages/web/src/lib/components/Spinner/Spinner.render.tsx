import * as React from 'react';
import Spin from 'src/components/Spin';
import Icon from 'src/lib/assets/icons/Spinner';
import Text from 'src/lib/components/Text';
import { BACKGROUND_COLORS } from 'src/lib/config/styles/textIconColors';
import { Text as TextType } from 'src/lib/types/general';
import { Container, TextContainer } from './Spinner.style';

interface IProps {
  testID?: string;
  text?: TextType;
  size: number;
}

/**
 * Generic spinner  component
 */
const Spinner = ({ testID, text, size }: IProps) => (
  <Container>
    <Spin size={size}>
      <Icon
        size={size}
        testID={testID || 'Spinner'}
        backgroundColor={BACKGROUND_COLORS.WHITE}
      />
    </Spin>
    {text && (
      <TextContainer>
        <Text
          text={text}
          backgroundColor={BACKGROUND_COLORS.WHITE}
          type="overline"
        />
      </TextContainer>
    )}
  </Container>
);

Spinner.defaultProps = {
  size: 40,
};

export default Spinner;
