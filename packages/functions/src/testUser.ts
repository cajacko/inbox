import * as functions from 'firebase-functions';
import auth from './utils/auth';
import db from './utils/db';
import { testEmail } from '../env.local.json';

/**
 * Get the test user ref
 */
const getTestUserRef = () =>
  auth
    .getUserByEmail(testEmail)
    .then(user => db.collection('users').doc(user.uid));

/**
 * Reset all the data in the test user
 */
export const clearTestUser = (
  req: functions.Request,
  res: functions.Response
) =>
  getTestUserRef().then(ref =>
    ref
      .set({})
      .then(() => ({}))
      .catch(e => ({
        hasError: true,
        error: e.message,
      }))
      .then((data) => {
        res.json(data);
      }));

/**
 * Return all the test user data
 */
export const getTestUser = (req: functions.Request, res: functions.Response) =>
  getTestUserRef().then(ref =>
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }

        return {};
      })
      .catch(e => ({
        hasError: true,
        error: e.message,
      }))
      .then((data) => {
        res.json(data);
      }));
