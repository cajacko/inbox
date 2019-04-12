import * as functions from 'firebase-functions';
import { IDb } from './types/general';
import auth from './utils/auth';
import dbHOC, { clearDbQueue } from './utils/db';
import { TEST_EMAIL } from '../env.json';

const revokedTokensField = 'revokedIdTokens';

let dbCache: IDb | undefined;

/**
 * Get the test user ref
 */
export const getTestUserId = () =>
  auth.getUserByEmail(TEST_EMAIL).then(user => user.uid);

/**
 * Get the test db
 */
export const getTestDb = (): Promise<IDb> => {
  if (dbCache) return Promise.resolve(dbCache);

  return getTestUserId().then((userId) => {
    dbCache = dbHOC(userId);

    return dbCache;
  });
};

/**
 * Set the revoked tokens
 */
const setRevokedIdTokens = (data: string[]) =>
  getTestDb().then(db => db.set(revokedTokensField, data));

/**
 * Get the revoked tokens
 */
export const getRevokedIdTokens = () =>
  getTestDb().then(db =>
    db.get(revokedTokensField).then(tokens => tokens || []));

/**
 * Return all the test user data
 */
export const getTestUser = (req: functions.Request, res: functions.Response) =>
  getTestDb().then(db =>
    db
      .get('')
      .catch(e => ({
        hasError: true,
        error: e.message,
      }))
      .then((data) => {
        res.json(data || {});
      }));

/**
 * Reset all the data in the test user
 */
export const clearTestUser = (
  req: functions.Request,
  res: functions.Response
) =>
  // Clear the queue so calls from the last test won't get run in the current
  // test
  clearDbQueue()
    .then(() => getTestDb())
    .then(db =>
      db
        .remove('')
        .catch(e => ({
          hasError: true,
          error: e.message,
        }))
        .then(() => {
          res.json({ success: true, error: null });
        }));

/**
 * Revoke a test user id
 */
export const revokeIdToken = (
  req: functions.Request,
  res: functions.Response
) =>
  getRevokedIdTokens()
    .then(tokens => tokens.concat(JSON.parse(req.body).idToken))
    .then(setRevokedIdTokens)
    .catch(e => ({
      hasError: true,
      error: e.message,
    }))
    .then((data) => {
      res.json(data);
    });
