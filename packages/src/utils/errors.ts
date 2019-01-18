import defaultErrors from 'src/lib/config/errors.json';
import AppError from 'src/lib/modules/AppError';
import Errors from 'src/lib/modules/Errors';

const errors = new Errors(defaultErrors, '100-001');

errors.setErrorBoundaryError((error: AppError) => {
  try {
    // Let the error boundary handle the default error
    if (!errors.hasValidErrorCode(error)) return null;

    return errors.getError(error);
  } catch (e) {
    return null;
  }
});

export default errors;
