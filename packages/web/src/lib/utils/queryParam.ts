type Search = string | undefined;

/**
 * Given a key get get the query param value
 */
export const get = (search: Search, key: string) => {
  if (!search) return undefined;

  const justParams = search.replace('?', '');

  const parts = justParams.split('&');

  let val: undefined | string;

  parts.forEach((part) => {
    const [partKey, partValue] = part.split('=');

    if (partKey === key) {
      val = partValue;
    }
  });

  return val;
};

/**
 * Set the query param value
 */
export const set = (search: Search, key: string, value: string | undefined) => {
  if (!search) return `?${key}=${value}`;

  const justParams = search.replace('?', '');

  const parts = justParams.split('&');
  let newParts;

  if (value === undefined) {
    newParts = parts.filter((part) => {
      const [partKey] = part.split('=');

      return partKey !== key;
    });
  } else {
    let hasSet = false;

    newParts = parts.map((part) => {
      const [partKey] = part.split('=');

      if (partKey === key) {
        hasSet = true;
        return `${key}=${value}`;
      }

      return part;
    });

    if (!hasSet) {
      newParts.push(`${key}=${value}`);
    }
  }

  if (!newParts.length) return '';

  return newParts.sort().reduce((acc, part, index) => {
    const start = index === 0 ? '' : '&';

    return `${acc}${start}${part}`;
  }, '?');
};

/**
 * Remove a query param
 */
export const remove = (search: Search, key: string) =>
  set(search, key, undefined);
