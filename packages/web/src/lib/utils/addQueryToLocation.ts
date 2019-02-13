/**
 * Add a param to the query string
 */
const addQueryToLocation = (location: string, key: string, val: string) =>
  `${location}?${key}=${val}`;

export default addQueryToLocation;
