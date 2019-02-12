import * as functions from 'firebase-functions';
import * as express from 'express';
import { ApolloServer, gql, Config } from 'apollo-server-express';
import * as config from './serverConfig';

/**
 * Start the apollo server
 */
const graphqlServer = (req: functions.Request, res: functions.Response) => {
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

          queryResolvers[query] = (obj: any, args: any) => resolver(args);
        });
      }

      if (Mutation) {
        mutationResolvers = { ...Mutation, ...mutationResolvers };

        Object.keys(Mutation).forEach((mutation) => {
          const resolver = Mutation[mutation];

          mutationResolvers[mutation] = (obj: any, args: any) => resolver(args);
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
  });

  const app = express();

  server.applyMiddleware({ app });

  return app(req, res);
};

export default graphqlServer;
