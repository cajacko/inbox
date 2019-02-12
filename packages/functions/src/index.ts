import * as functions from 'firebase-functions';
import * as testUser from './testUser';
import graphqlServer from './lib/graphql/server';

export const graphql = functions.https.onRequest(graphqlServer);
export const clearTestUser = functions.https.onRequest(testUser.clearTestUser);
export const getTestUser = functions.https.onRequest(testUser.getTestUser);
