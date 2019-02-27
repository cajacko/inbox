/* eslint no-underscore-dangle: 0 */
import { DB } from '../types/general';
import db from './prodDb';
// import db from './testDb';

/**
 * Get the users location
 */
const userLocation = (user: string) => (location?: string) =>
  `/users/${user}/${location || ''}`;

/**
 * Return a db instance that can only effect the specified user
 */
const dbHOC: DB = (user) => {
  const getLocation = userLocation(user);

  return {
    get: (location = '') => db.get(getLocation(location)),
    set: (location = '', value) => db.set(getLocation(location), value),
    remove: (location = '') => db.remove(getLocation(location)),
  };
};

/**
 * Clear the db queue, only used in mock db
 */
export const clearDbQueue = () => {
  if (db._clearQueue) {
    return Promise.resolve(db._clearQueue());
  }

  return Promise.resolve();
};

export default dbHOC;
