// @flow

import { request } from 'graphql-request';
import AppError from 'src/lib/modules/AppError';

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

    client[methodKey] = (...args: any) => {
      const { mutation, query, vars } = method(...args);

      const queryReq = query || mutation;

      if (!queryReq) {
        throw new AppError(
          'No query or mutation given to the graphqlClient',
          '100-015'
        );
      }

      return new Promise((resolve, reject) => {
        if (typeof timeout === 'number') {
          setTimeout(() => {
            const error = new AppError(
              `API call timed out after ${String(timeout)}ms`,
              '100-016'
            );
            error.set('timeout', true);
            reject(error);
          }, timeout);
        }

        request(endpoint, queryReq, vars)
          .then((data) => {
            const keys = Object.keys(data);

            if (keys.length === 1) {
              resolve(data[keys[0]]);
              return;
            }

            resolve(data);
          })
          .catch(reject);
      });
    };
  });

  return client;
}

export default graphqlClient;
