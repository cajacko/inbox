import { readJSON, writeJSON, ensureFile } from 'fs-extra';
// @ts-ignore
import * as tmpDir from 'temp-dir';
import { join } from 'path';
import { IDb } from '../types/general';

const get = require('lodash/get');
const set = require('lodash/set');
const unset = require('lodash/unset');

const tmpFile = join(tmpDir, 'inboxDb.json');

/**
 * Get and ensure the db file
 */
const getDbFile = () =>
  ensureFile(tmpFile).then(() =>
    readJSON(tmpFile)
      .then(data => data || {})
      .catch(() => ({})));

/**
 * Replace the slashes with dots for the lodash get funcs
 */
const parseLocation = (location: string = '') =>
  location.replace(/\//g, '.').replace(/^\.+|\.+$/g, '');

/**
 * Return a db instance that can only effect the specified user
 */
const db: IDb = {
  get: (location = '') =>
    getDbFile().then(data => get(data, parseLocation(location))),
  set: (location = '', value) =>
    getDbFile()
      .then(data => set(data, parseLocation(location), value))
      .then(data => writeJSON(tmpFile, data, { spaces: 2 })),
  remove: (location = '') =>
    getDbFile()
      .then((data) => {
        unset(data, parseLocation(location));
        return data;
      })
      .then(data => writeJSON(tmpFile, data, { spaces: 2 }))
      .then(() => undefined),
};

export default db;
