import unit from 'src/utils/unit';

/**
 * Get the props to pass to the svg icon component
 */
const getSvgProps = (size: number, viewBox: string) => ({
  height: unit(size),
  viewBox,
  width: unit(size),
});

export default getSvgProps;
