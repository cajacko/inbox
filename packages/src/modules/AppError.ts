import { ErrorCode } from 'src/lib/config/errors';

/**
 * Custom error class to use everywhere in this project. Adds an error code to
 * the Error class
 */
class AppError extends Error {
  /**
   * Customise the Error class by adding an error code to it and appending the
   * code to the error message. Here's some common codes:
   * - 100-001 - General Error
   * - 100-003 - Dev Error
   */
  constructor(devMessage: string, errorCode: ErrorCode) {
    const message = `Code: ${errorCode}; ${devMessage}`;

    super(message);
  }

  /**
   * Get the error code from an AppError or string
   */
  public static parseErrorCode(error: AppError | string) {
    let message;

    if (typeof error === 'string') {
      message = error;
    } else if (error && error.message) {
      ({ message } = error);
    } else {
      return null;
    }

    // eslint-disable-next-line no-useless-escape
    const match = message.match(/Code: ([0-9\-]+);/);

    if (!match) return null;

    const code = match[1];

    return code || null;
  }
}

export default AppError;
