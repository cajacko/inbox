import defaultErrors from 'src/lib/config/errors.json';
import AppError from 'src/lib/modules/AppError';
import Errors from 'src/lib/modules/Errors';

const errors = new Errors(defaultErrors, '100-001');

errors.setErrorBoundaryError((error: AppError) => {
  try {
    const code = AppError.parseErrorCode(error);

    if (!code) return null;

    return errors.getError(code);
  } catch (e) {
    return null;
  }
});

export default errors;
