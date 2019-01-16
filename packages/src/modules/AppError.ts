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
}

export default AppError;
