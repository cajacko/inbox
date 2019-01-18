import AppError from 'src/lib/modules/AppError';
import {
  ErrorCode,
  IErrors,
  IExtendedError,
  IExtendedErrors,
} from 'src/lib/types/general';
import logger from 'src/lib/utils/logger';

type Func = (
  e: AppError,
  info?: any,
  props?: { [key: string]: any }
) => null | IExtendedError;
type ErrorBoundaryFunc = null | Func;

/**
 * Handle the getting and setting of the errors to use in the app
 */
class Errors {
  private errorBoundaryFunc: null | ErrorBoundaryFunc;
  private errors: IExtendedErrors;
  private defaultErrorCode: ErrorCode;

  /**
   * Set the initial errors
   */
  constructor(
    errors: IErrors,
    defaultErrorCode: ErrorCode,
    errorBoundaryFunc: ErrorBoundaryFunc = null
  ) {
    this.setErrors(errors, defaultErrorCode, true, true);
    this.errorBoundaryFunc = errorBoundaryFunc;
  }

  /**
   * Given the error boundary params, get the error object we should use
   */
  public getErrorBoundaryError(
    error: AppError,
    info?: any,
    props?: { [key: string]: any }
  ) {
    // Don't return the default error here, as we want the error boundary to
    // have one set

    if (this.errorBoundaryFunc) {
      return this.errorBoundaryFunc(error, info, props);
    }

    return null;
  }

  /**
   * Set the errors we'll be using
   */
  public setErrors(
    errors: IErrors,
    defaultErrorCode: ErrorCode,
    replace?: boolean,
    errorIfNotPassed?: boolean
  ) {
    if ((errorIfNotPassed || replace) && (!errors || !defaultErrorCode)) {
      throw new AppError(
        'Errors.setErrors(errors, defaultError) requires both an errors object and a default error.',
        '100-003'
      );
    }

    if (replace) {
      this.errors = {};
    }

    if (errors) {
      Object.keys(errors).forEach((code) => {
        this.errors[code] = { code, ...errors[code] };
      });
    }

    this.defaultErrorCode = defaultErrorCode;

    if (!this.getDefaultError()) {
      throw new AppError(
        'Errors.setError could not get the default error',
        '100-003'
      );
    }
  }

  /**
   * Get the default error if all else fails, should never get this far
   */
  public getDefaultError() {
    const error = this.errors[this.defaultErrorCode];

    if (error) return error;

    logger.error('Could not get default error', {
      defaultErrorCode: this.defaultErrorCode,
      errors: this.errors,
    });

    return {
      code: '100-000',
      label: 'Dev Error',
      message: 'Errors.DevError.Message',
      title: 'Errors.DevError.Title',
    };
  }

  /**
   * Set the error boundary error func
   */
  public setErrorBoundaryError(errorBoundaryFunc: ErrorBoundaryFunc) {
    this.errorBoundaryFunc = errorBoundaryFunc;
  }

  /**
   * Is the given string a valid error code
   */
  public hasValidErrorCode(e: string | AppError) {
    let code;

    if (e instanceof AppError) {
      code = AppError.parseErrorCode(e);
    } else {
      code = e;
    }

    if (!code) return false;

    return !!this.errors[code];
  }

  /**
   * Get an error object from the error code. Here's some common codes:
   * - 100-001 - General Error
   * - 100-003 - Dev Error
   */
  public getError(e: ErrorCode | AppError): IExtendedError {
    let code;

    if (e instanceof AppError) {
      code = AppError.parseErrorCode(e);
    } else {
      code = e;
    }

    if (code) {
      const error = this.errors[code];

      if (error) return error;
    }

    logger.error(`Could not get error with code ${code}`, {
      code,
      errors: this.errors,
    });

    return this.getDefaultError();
  }

  /**
   * Get all the error objects
   */
  public getErrors() {
    return this.errors;
  }
}

export default Errors;
