import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { testEmail } from '../env.local.json';

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();

/**
 * Get the test user ref
 */
const getTestUserRef = () =>
  auth
    .getUserByEmail(testEmail)
    .then(user => db.collection('users').doc(user.uid));

export const clearTestUser = functions.https.onRequest((request, response) =>
  getTestUserRef().then(ref =>
    ref
      .set({})
      .then(() => ({}))
      .catch(e => ({
        hasError: true,
        error: e.message,
      }))
      .then((res) => {
        response.json(res);
      })));

export const getTestUser = functions.https.onRequest((request, response) =>
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
      .then((res) => {
        response.json(res);
      })));
