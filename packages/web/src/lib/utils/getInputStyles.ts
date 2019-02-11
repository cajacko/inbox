import { INPUT_TYPES, InputType } from 'src/lib/config/styles/text';

/**
 * Get the input styles based off the given type
 */
const getInputStyles = (type?: InputType) =>
  (type && INPUT_TYPES[type]) || INPUT_TYPES.body1;

export default getInputStyles;
