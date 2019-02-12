import { request } from 'graphql-request';
import AppError from 'src/lib/modules/AppError';
import * as reminder from 'src/lib/graphql/reminder/client';

/**
 * Wrap all the
 */
class GraphQLClient {
  /**
   * Store the initial config
   */
  constructor(endpoint: string, timeout?: number) {
    this.endpoint = endpoint;
    this.timeout = timeout || 2000;
  }

  private endpoint: string;
  private timeout: number;

  /**
   * Change the timeout for requests
   */
  public _setTimeout(timeout: number) {
    return new GraphQLClient(this.endpoint, timeout);
  }

  /**
   * Wrap the api methods
   */
  private wrap<T>(method) {
    return (...args): Promise<T> => {
      const { mutation, query, vars } = method(...args);

      const queryReq = query || mutation;

      if (!queryReq) {
        throw new AppError(
          'No query or mutation given to the graphqlClient',
          '100-015'
        );
      }

      return new Promise((resolve, reject) => {
        if (typeof this.timeout === 'number') {
          setTimeout(() => {
            const error = new AppError(
              `API call timed out after ${String(this.timeout)}ms`,
              '100-016'
            );
            error.timeout = true;
            reject(error);
          }, this.timeout);
        }

        request(this.endpoint, queryReq, vars)
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
  }

  public setReminder = this.wrap<{ hi: string }>(reminder.setReminder);
}

const client = new GraphQLClient('');

client.setReminder({ hitwe: 'boo' }).then((res) => {
  // eslint-disable-next-line
  console.debug(res.hi);
});

export default GraphQLClient;
