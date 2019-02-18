/* eslint no-underscore-dangle: 0 no-console: 0 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { ApolloServer, gql, Config } from 'apollo-server-express';
import auth from '../../utils/auth';
import db from '../../utils/db';
import { getTestUserId } from '../../testUser';
import * as config from './serverConfig';

const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });

interface IContext {
  authenticatedUserRef: admin.firestore.DocumentReference;
}

interface IRequest extends functions.Request {
  user: admin.auth.DecodedIdToken;
}

// Express middleware that validates Firebase ID Tokens passed in the
// Authorization HTTP header. The Firebase ID token needs to be passed as a
// Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
/**
 * Validate the firebase token and add it to the request object
 */
const validateFirebaseIdToken = (
  req: IRequest,
  res: functions.Response,
  next: () => void
) => {
  /**
   * Send the unauthorized request
   */
  const sendUnauthorized = () => res.status(403).send('Unauthorized');

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    // No Firebase ID token was passed as a Bearer token in the Authorization
    // header. Make sure you authorize your request by providing the following
    // HTTP header: Authorization: Bearer <Firebase ID Token> or by passing a
    // "__session" cookie.
    sendUnauthorized();
    return;
  }

  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Read the ID Token from the Authorization header.
    [, idToken] = req.headers.authorization.split('Bearer ');
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    sendUnauthorized();
    return;
  }

  auth
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      // ID Token correctly decoded
      req.user = decodedIdToken;
      next();
    })
    .catch((error) => {
      // Error while verifying Firebase ID token
      sendUnauthorized();
    });
};

/**
 * Start the apollo server
 */
const graphqlServer = (isTestUser: boolean) => (
  req: functions.Request,
  res: functions.Response
) => {
  let typeDefs = '';
  let queries = '';
  let mutations = '';
  let queryResolvers = {};
  let mutationResolvers = {};

  if (config.typeDefs) {
    Object.values(config.typeDefs).forEach(({ types, query, mutation }) => {
      if (types) {
        typeDefs = `
          ${typeDefs}
          ${types}
        `;
      }

      if (query) {
        queries = `
          ${queries}
          ${query}
        `;
      }

      if (mutation) {
        mutations = `
          ${mutations}
          ${mutation}
        `;
      }
    });
  }

  if (config.resolvers) {
    Object.values(config.resolvers).forEach(({ Query, Mutation }) => {
      if (Query) {
        queryResolvers = { ...Query, ...queryResolvers };

        Object.keys(Query).forEach((query) => {
          const resolver = Query[query];

          queryResolvers[query] = (parent: any, args: any, context: IContext) =>
            resolver(args, context.authenticatedUserRef);
        });
      }

      if (Mutation) {
        mutationResolvers = { ...Mutation, ...mutationResolvers };

        Object.keys(Mutation).forEach((mutation) => {
          const resolver = Mutation[mutation];

          mutationResolvers[mutation] = (
            parent: any,
            args: any,
            context: IContext
          ) => resolver(args, context.authenticatedUserRef);
        });
      }
    });
  }

  typeDefs = `
    ${typeDefs}

    type Query {
      ${queries}
    }
  `;

  if (mutations !== '') {
    typeDefs = `
      ${typeDefs}

      type Mutation {
        ${mutations}
      }
    `;
  }

  const resolvers: Config['resolvers'] = {};

  if (Object.keys(mutationResolvers).length) {
    resolvers.Mutation = mutationResolvers;
  }

  if (Object.keys(queryResolvers).length) {
    resolvers.Query = queryResolvers;
  }

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    context: async (context: { req: IRequest }) => {
      if (isTestUser) {
        const testUserId = await getTestUserId();

        return {
          authenticatedUserRef: await db.collection('users').doc(testUserId),
        };
      }

      const { user } = context.req;

      if (!user) throw new Error('No user id token on req object');

      return {
        authenticatedUserRef: await db.collection('users').doc(user.uid),
      };
    },
  });

  const app = express();

  app.use(cors);
  app.use(cookieParser);

  if (!isTestUser) {
    app.use(validateFirebaseIdToken);
  }

  server.applyMiddleware({ app });

  return app(req, res);
};

export default graphqlServer;
