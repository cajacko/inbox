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

export default dbHOC;
