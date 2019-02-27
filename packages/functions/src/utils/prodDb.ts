import admin from './admin';
import { IDb } from '../types/general';

const firebaseDb = admin.database();

/**
 * Return a db instance that can only effect the specified user
 */
const db: IDb = {
  get: (location = '') =>
    firebaseDb
      .ref(location)
      .once('value')
      .then(snapshot => snapshot.val()),
  set: (location = '', value) => firebaseDb.ref(location).set(value),
  remove: (location = '') => firebaseDb.ref(location).remove(),
};

export default db;
