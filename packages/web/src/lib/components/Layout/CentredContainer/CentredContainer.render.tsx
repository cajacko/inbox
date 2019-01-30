import * as React from 'react';
import Measure from 'src/lib/components/Layout/Measure';
import { IMeasurements } from 'src/lib/components/Layout/Measure/Measure.component';
import { Children } from 'src/lib/types/libs';
import { BACKGROUND_COLOR, Box, Container } from './CentredContainer.style';

type RenderProp = (
  props: { backgroundColor: typeof BACKGROUND_COLOR }
) => Children;

interface IProps {
  testID?: string;
  children: RenderProp;
}

const threshold = 800;

/**
 * Should the container be bound
 */
const shouldBound = (width: number) => width > threshold;

/**
 * Decide when to trigger a rerender when the dimensions change
 */
const onChange = (next: IMeasurements, last: IMeasurements) => {
  if (shouldBound(next.width) !== shouldBound(last.width)) return true;

  return false;
};

/**
 * A horizontally and vertically centred container with a border
 */
const CentredContainer = ({ children, testID }: IProps) => (
  <Measure onChange={onChange}>
    {({ width, measureProps }) => (
      <Container {...measureProps} testID={testID} bound={shouldBound(width)}>
        <Box bound={shouldBound(width)}>
          {children({ backgroundColor: BACKGROUND_COLOR })}
        </Box>
      </Container>
    )}
  </Measure>
);

export default CentredContainer;
