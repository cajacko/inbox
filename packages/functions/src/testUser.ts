import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import auth from './utils/auth';
import db from './utils/db';
import { testEmail } from '../env.local.json';

/**
 * Get the revoked id tokens doc
 */
const getRevokedIdTokensDoc = () =>
  db.collection('revokedIdTokens').doc('tokens');

/**
 * Set the revoked tokens
 */
const setRevokedIdTokens = (data: string[]) =>
  getRevokedIdTokensDoc().set({ tokens: data });

/**
 * Get the revoked tokens
 */
export const getRevokedIdTokens = () =>
  getRevokedIdTokensDoc()
    .get()
    .then(snapshot => snapshot.data() || { tokens: [] })
    .then(({ tokens }) => tokens);

/**
 * Get the test user ref
 */
export const getTestUserId = () =>
  auth.getUserByEmail(testEmail).then(user => user.uid);

/**
 * Get all the data from the query
 */
const getQueryData = (query: admin.firestore.QuerySnapshot) =>
  Promise.all(query.docs.map((data) => {
    if (!data.exists) return {};

    return {
      [data.id]: data.data(),
    };
  })).then(data => data.reduce((acc, obj) => ({ ...acc, ...obj }), {}));

/**
 * Get all the data associated with a firestore doc
 */
const getAll = (doc: admin.firestore.DocumentReference) =>
  doc.getCollections().then(collections =>
    Promise.all(collections.map(collection =>
      collection
        .get()
        .then(data => getQueryData(data))
        .then(data => ({
          [collection.id]: data,
        })))).then(data => data.reduce((acc, obj) => ({ ...acc, ...obj }), {})));

/**
 * Return all the test user data
 */
export const getTestUser = (req: functions.Request, res: functions.Response) =>
  getTestUserId().then(userId =>
    getAll(db.collection('users').doc(userId))
      .catch(e => ({
        hasError: true,
        error: e.message,
      }))
      .then((data) => {
        res.json(data);
      }));

/**
 * Reset all the data in the test user
 */
export const clearTestUser = (
  req: functions.Request,
  res: functions.Response
) => {
  const collectiosToDelete = ['reminders'];

  return getTestUserId()
    .then(userId =>
      Promise.all([
        setRevokedIdTokens([]),
        db
          .collection('users')
          .doc(userId)
          .delete(),
        Promise.all(collectiosToDelete.map(collection =>
          db
            .collection(`/users/${userId}/${collection}`)
            .get()
            .then((docs) => {
              const batch = db.batch();

              docs.forEach((doc) => {
                batch.delete(doc.ref);
              });

              return batch.commit();
            }))),
      ]))
    .catch(e => ({
      hasError: true,
      error: e.message,
    }))
    .then((data) => {
      res.json(data);
    });
};

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
