// @flow

import { GraphQLClient } from 'graphql-request';
import AppError from 'src/lib/modules/AppError';
import Auth from 'src/lib/modules/Auth';

type InMethod = (
  ...args: any
) => { mutation?: string; query?: string; vars?: { [key: string]: any } };

interface IMethods {
  [key: string]: InMethod;
}

/**
 * Creates the graphql client. So the client can make graphql requests.
 */
function graphqlClient<T>(
  methods: IMethods,
  endpoint: string,
  timeout: number = 20000
) {
  const client = {
    /**
     * Can define a custom timeout, this returns a new instance of the
     * graphql client, with every method using the new timeout
     */
    _setTimeout: (newTimeout: number) =>
      graphqlClient(methods, endpoint, newTimeout),
    ...methods,
  };

  Object.keys(methods).forEach((methodKey) => {
    const method = methods[methodKey];

    client[methodKey] = (...passedParams: any[]) => {
      const args = passedParams.slice();
      let isTryAgain = false;

      if (typeof args[0] === 'object' && args[0].tryAgain === true) {
        isTryAgain = true;
        args.splice(0, 1);
      }

      /**
       * Func that will rerun this same query
       */
      const tryAgain = () => client[methodKey]({ tryAgain: true }, ...args);

      const { mutation, query, vars } = method(...args);

      const queryReq = query || mutation;

      if (!queryReq) {
        throw new AppError(
          'No query or mutation given to the graphqlClient',
          '100-015'
        );
      }

      return new Promise((resolve, reject) => {
        let timeoutInstance: any;

        if (typeof timeout === 'number') {
          timeoutInstance = setTimeout(() => {
            const error = new AppError(
              `API call timed out after ${String(timeout)}ms`,
              '100-016'
            );

            error.set('timeout', true);
            reject(error);
          }, timeout);
        }

        Auth.getIdToken().then((idToken) => {
          /**
           * If the request is unauthorised or we have no idtoken, try and get
           * one
           */
          const unauthorisedFlow = () => {
            if (isTryAgain) {
              // Force manual login
              reject(new Error('Aborting request, as had to manually login'));

              Auth.relogin();
            } else {
              // Try a background login
              Auth.refreshIdToken()
                .catch((refreshError: AppError) => refreshError)
                .then(tryAgain)
                .then(resolve)
                .catch(reject);
            }
          };

          if (!idToken) {
            unauthorisedFlow();
            return;
          }

          const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          graphQLClient
            .request(queryReq, vars)
            .then((data) => {
              const keys = Object.keys(data);

              if (keys.length === 1) {
                resolve(data[keys[0]]);
                return;
              }

              resolve(data);
            })
            .catch((e) => {
              // Unauthorised, try and silent login and try again. Otherwise
              // force a new login
              if (e && e.response && e.response.status === 403) {
                unauthorisedFlow();
              } else {
                reject(e);
              }
            })
            .then(() => {
              if (timeoutInstance) clearTimeout(timeoutInstance);
            });
        });
      });
    };
  });

  return client;
}

export default graphqlClient;
