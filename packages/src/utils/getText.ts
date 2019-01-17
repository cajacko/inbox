// Use this to reinforce that it is dangerous
/* eslint no-underscore-dangle: 0 */

import AppError from 'src/lib/modules/AppError';
import { Text } from 'src/lib/types/general';
import marketingCopy from 'src/lib/utils/marketingCopy';

/**
 * Get the text value to use. We only allow text that's in the marketing copy,
 * unless you pass in an object with the val at _textFromConst. This should
 * encourage you to only use text if it is specified in the marketing copy.
 * Anything from the server should use _textFromConst.
 */
const getText = (text: Text): string => {
  if (typeof text === 'string') {
    return marketingCopy.get(text);
  }

  if (typeof text === 'object' && typeof text._textFromConst === 'string') {
    return text._textFromConst;
  }

  throw new AppError('getText received an unknown input', '100-003');
};

export default getText;
