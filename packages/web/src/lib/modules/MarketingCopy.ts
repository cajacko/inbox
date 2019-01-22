import get from 'lodash/get';
import merge from 'lodash/merge';
import AppError from 'src/lib/modules/AppError';
import { MarketingTextKey, MarketingTextValue } from 'src/lib/types/general';

interface ICopy {
  [key: string]: ICopy | MarketingTextValue;
}

// eslint-disable-next-line id-length
type ID = MarketingTextKey | { key: MarketingTextKey; [key: string]: string };

/**
 * Handle getting text from the marketing copy file
 */
class MarketingCopy {
  private copy: ICopy;

  /**
   * Set the initial props and error class to use
   */
  constructor(copy: ICopy) {
    this.copy = copy;
  }

  /**
   * Set the marketing copy
   */
  public set(copy: ICopy, replace?: boolean) {
    if (replace) this.copy = {};

    this.copy = merge(this.copy, copy);
  }

  /**
   * Get the text from the copy by an id
   */
  private getText(id: string) {
    const text = get(this.copy, id);

    if (!text) {
      throw new AppError(`Could not find any text at the id: ${id}`, '100-003');
    }

    if (typeof text !== 'string') {
      throw new AppError(`Text is not a string at id: ${id}`, '100-003');
    }

    return text;
  }

  /**
   * Get a specific piece of copy
   */
  public get(id: ID) {
    // If the id is an object it means it's a template, so replace the template
    // bits with the vars
    if (typeof id === 'object') {
      const { key, ...vars } = id;

      let text = this.getText(key);

      Object.keys(vars).forEach((varKey) => {
        // eslint-disable-next-line no-useless-escape
        text = text.replace(`\$\{${varKey}\}`, String(vars[varKey]));
      });

      return text;
    }

    return this.getText(id);
  }

  /**
   * Get all the copy
   */
  public getAll() {
    return this.copy;
  }
}

export default MarketingCopy;
