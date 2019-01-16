import AppError from 'src/lib/modules/AppError';
import objHasVal from 'src/lib/utils/conditionals/objHasVal';

/**
 * Ensure the object has the specified value
 */
const ensureObjHasVal = (
  obj: { [key: string]: any },
  val: any,
  err?: AppError
) => {
  if (!objHasVal(obj, val)) {
    if (err) throw err;

    throw new AppError(
      'ensureObjHasVal throw an error. The supplied object does not have the given value',
      '100-003'
    );
  }

  return val;
};

export default ensureObjHasVal;
