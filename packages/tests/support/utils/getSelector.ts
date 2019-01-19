import { ISelector } from '../config/selectors';

const platform = 'web';

const selector = (
  generalSelector: ISelector,
  options?: { [key: string]: any },
  id?: string
): string => {
  const platformSelector = generalSelector[platform];

  if (!platformSelector) {
    throw new Error(`Could not find the ${platform} selector ${id ? `for "${id}"` : ''}`);
  }

  if (typeof platformSelector === 'function') {
    return platformSelector(options);
  } else if (typeof platformSelector !== 'string') {
    throw new Error('platformSelector is not a function or string');
  }

  return platformSelector;
};

export default selector;
