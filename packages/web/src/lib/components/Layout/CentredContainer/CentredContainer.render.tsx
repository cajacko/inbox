import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import { BACKGROUND_COLOR, Box, Container } from './CentredContainer.style';

type RenderProp = (
  props: { backgroundColor: typeof BACKGROUND_COLOR }
) => Children;

interface IProps {
  testID?: string;
  children: RenderProp;
}

/**
 * A horizontally and vertically centred container with a border
 */
const CentredContainer = ({ children, testID }: IProps) => (
  <Container testID={testID}>
    <Box>
      {typeof children === 'function'
        ? children({ backgroundColor: BACKGROUND_COLOR })
        : children}
    </Box>
  </Container>
);

export default CentredContainer;
