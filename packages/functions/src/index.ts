import * as functions from 'firebase-functions';
import graphqlServer from './lib/graphql/server';
import * as testUser from './testUser';

export const graphql = functions.https.onRequest(graphqlServer(false));
export const clearTestUser = functions.https.onRequest(testUser.clearTestUser);
export const getTestUser = functions.https.onRequest(testUser.getTestUser);
export const testUserGraphql = functions.https.onRequest(graphqlServer(true));
export const revokeIdToken = functions.https.onRequest(testUser.revokeIdToken);
