// @flow

import logger from 'src/lib/utils/logger';
import AppError from 'src/lib/AppError';

class Errors {
  constructor(errors, defaultErrorCode, customGetErrorBoundaryError = null) {
    this.setErrors(errors, defaultErrorCode, true, true);
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getErrorBoundaryError(error, info, props) {
    if (this.customGetErrorBoundaryError) {
      return (
        this.customGetErrorBoundaryError(error, info, props) ||
        this.getDefaultError()
      );
    }

    return this.getDefaultError();
  }

  setErrors(errors, defaultErrorCode, replace, errorIfNotPassed) {
    if ((errorIfNotPassed || replace) && (!errors || !defaultErrorCode)) {
      throw new AppError('Errors.setErrors(errors, defaultError) requires both an errors object and a default error.');
    }

    if (replace) {
      this.errors = {};
    }

    if (errors) {
      Object.keys(errors).forEach((code) => {
        this.errors[code] = this.mapError(code, errors[code]);
      });
    }

    if (defaultErrorCode) {
      this.defaultErrorCode = defaultErrorCode;

      if (!this.getDefaultError()) {
        throw new AppError('Errors.setError could not get the default error');
      }
    }
  }

  getDefaultError() {
    const error = this.errors[this.defaultErrorCode];

    if (error) return error;

    logger.error('Could not get default error', {
      defaultErrorCode: this.defaultErrorCode,
      errors: this.errors,
    });
  }

  mapError(code, error) {
    return { code, ...error };
  }

  setErrorBoundaryError(customGetErrorBoundaryError) {
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getError(code) {
    if (!code) return this.defaultError;

    const error = this.errors[code];

    if (error) return error;

    logger.error(`Could not get error with code ${code}`, {
      errors: this.errors,
      code,
    });

    return this.getDefaultError();
  }

  getErrors() {
    return this.errors;
  }
}

export default Errors;
