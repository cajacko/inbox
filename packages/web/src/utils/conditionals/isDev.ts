/**
 * Get if the app is in dev mode or not
 */
const isDev = () => window.location.href.includes('localhost');

export default isDev;
