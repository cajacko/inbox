const getIndex = (int: string) => {
  const val = parseInt(int, 10);

  if (Number.isNaN(val) || typeof val !== 'number') {
    throw new Error(`Could not parse int from "${int}"`);
  }

  return val - 1;
};

export default getIndex;
