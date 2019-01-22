const getSize = () => {
  const defaultSize = 'tablet';

  const index = process.argv.indexOf('--tags');

  if (index < 0) return defaultSize;

  const tagsArg = process.argv[index + 1];

  if (!tagsArg) return defaultSize;

  if (tagsArg.startsWith('@size-mobile')) return 'mobile';
  if (tagsArg.startsWith('@size-tablet')) return 'tablet';
  if (tagsArg.startsWith('@size-desktop')) return 'desktop';

  return defaultSize;
};

export default getSize;
