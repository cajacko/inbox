import merge from 'lodash/merge';
import get from 'lodash/get';

type Copy = {
  [string]: Copy | string;
};

type ID = string | { key: string; [string]: string };

/**
 * Handle getting text from the marketing copy file
 */
class MarketingCopy {
  copy: Copy;

  /**
   * Set the intial props and error class to use
   */
  constructor(copy: Copy) {
    this.copy = copy;

    // Can't use AppError here, as AppError imports all the errors, which relies
    // on all the marketing copy stuff being setup first.
    this.Error = Error;
  }

  /**
   * Set the error class to use, as sometimes we want to use a custom one that
   * contains error codes
   */
  setErrorClass(CustomError) {
    this.Error = CustomError;
  }

  /**
   * Set the marketing copy
   */
  set(copy: Copy, replace?: boolean) {
    if (replace) this.copy = {};

    this.copy = merge(this.copy, copy);
  }

  /**
   * Get the text from the copy by an id
   */
  _getText(id: string) {
    const text = get(this.copy, id);

    if (text) return text;

    const CustomError = this.Error;

    throw new CustomError(`Could not find any text at the id: ${id}`);
  }

  /**
   * Get a specific piece of copy
   */
  get(id: ID) {
    // If the id is an object it means it's a template, so replace the template
    // bits with the vars
    if (typeof id === 'object') {
      const { key, ...vars } = id;

      let text = this._getText(key);

      Object.keys(vars).forEach((varKey) => {
        text = text.replace(`\$\{${varKey}\}`, String(vars[varKey]));
      });

      return text;
    }

    return this._getText(id);
  }

  /**
   * Get all the copy
   */
  getAll() {
    return this.copy;
  }
}

export default MarketingCopy;
