/**
 * Does the object have the given value somewhere on it's first level
 */
const objHasVal = (obj: { [key: string]: any }, val: any) =>
  Object.values(obj).includes(val);

export default objHasVal;
