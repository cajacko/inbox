import { readJSON, writeJSON, ensureFile } from 'fs-extra';
// @ts-ignore
import * as tmpDir from 'temp-dir';
import { join } from 'path';
import { IDb } from '../types/general';

const get = require('lodash/get');
const set = require('lodash/set');
const unset = require('lodash/unset');
const Queue = require('promise-queue');

// Can only do 1 process at a time as we have to set the entire file in 1 go
const maxConcurrent = 1;
const maxQueue = Infinity;
// We use a new queue for each test, this ensures calls from a prev test don't
// get run during the current test
let queueId = 0;
let processId = queueId;
let queue = new Queue(maxConcurrent, maxQueue);

const tmpFile = join(tmpDir, 'inboxDb.json');

// eslint-disable-next-line
console.log(`Saving DB to: ${tmpFile}`);

/**
 * Get and ensure the db file
 */
const getDbFile = () =>
  ensureFile(tmpFile).then(() =>
    readJSON(tmpFile)
      .then(data => data || {})
      .catch(() => ({})));

/**
 * Set the db file
 */
const setDbFile = (data: any) =>
  ensureFile(tmpFile).then(() => {
    if (processId !== queueId) return Promise.resolve();

    return writeJSON(tmpFile, data, { spaces: 2 });
  });

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
      .then(setDbFile),
  remove: (location = '') =>
    getDbFile()
      .then((data) => {
        unset(data, parseLocation(location));
        return data;
      })
      .then(setDbFile)
      .then(() => undefined),
  _clearQueue: () => {
    queueId += 1;
    queue = new Queue(maxConcurrent, maxQueue);
    return Promise.resolve();
  },
};

// Wrap each func in the promise queue so it only runs one at a time
Object.keys(db).forEach((key) => {
  if (key.startsWith('_')) return;

  const origFunc = db[key];

  db[key] = (...args: any[]) => {
    const thisQueueId = queueId;

    return queue.add(() => {
      // If we're not using the queue anymore then just resolve straight away
      if (thisQueueId !== queueId) return Promise.resolve();

      processId = thisQueueId;

      return origFunc(...args);
    });
  };
});

export default db;
