import defaultErrors from 'src/lib/config/errors';
import AppError from 'src/lib/modules/AppError';
import Errors from 'src/lib/modules/Errors';

const errors = new Errors(defaultErrors, '100-001');

errors.setErrorBoundaryError((error: AppError) => {
  try {
    const match = error.message.match(/Code: ([0-9]+)/);

    if (!match) return null;

    const code = match[1];

    return errors.getError(code);
  } catch (e) {
    return null;
  }
});

export default errors;
