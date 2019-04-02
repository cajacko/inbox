/**
 * Open a url on the web
 */
const openUrl = (url: string) => () => {
  window.open(url, '_blank');
};

export default openUrl;
