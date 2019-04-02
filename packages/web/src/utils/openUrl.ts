/**
 * Open a url on the web
 */
const openUrl = (url: string) => () => {
  window.open(url, '_blank');

  return Promise.resolve();
};

export default openUrl;
