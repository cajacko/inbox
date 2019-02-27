import { diff } from 'deep-diff';
import { readJSON } from 'fs-extra';
import graphqlRequest from 'graphql-request';
import { join } from 'path';
import { inspect } from 'util';
import buildReminderObj from '../../utils/buildReminderObj';
import conditional from '../../utils/conditional';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import fetchApi from '../../utils/fetchApi';

const isEqual = require('lodash/isEqual');

class Api {
  public async data(condition: ICondition, key: string) {
    let changes: any;

    await conditional(
      condition,
      () =>
        Promise.all([this.getUserData(), this.getExpectedData(key)]).then(([userData, testData]) => {
          changes = diff(userData, testData);

          return !changes;
        }),
      () => {
        const stringDiff = inspect(changes, false, null, true);

        return {
          negative:
            'The data in the api matches the given data, expected it not to match',
          positive: `The data in the api does not match the given data, expected it to match. See diff below\n\n${stringDiff}\n\n`,
          waitNegative:
            'Timeout waiting for the api data not to match the given data',
          waitPositive: `Timeout waiting for the api data to match the given data. See last diff below\n\n${stringDiff}\n\n`,
        };
      }
    );
  }

  public async clearTestData() {
    const iterations = 3;
    let json: string;

    const loop = (i = 0): Promise<void> => {
      if (i > iterations) {
        return Promise.reject(new Error(`clearTestData did not clear successfully. Server data was:\n\n${String(json)}\n`));
      }

      return fetchApi('clearTestUser')
        .then(() => this.getUserData())
        .then((data) => {
          if (!isEqual(data, {})) {
            try {
              json = JSON.stringify(data, undefined, 2);
            } catch (e) {
              json = '';
            }

            return loop(i + 1);
          }

          return Promise.resolve();
        });
    };

    return loop();
  }

  private async getUserData() {
    return fetchApi('getTestUser');
  }

  private async getExpectedData(key: string) {
    return readJSON(join(__dirname, '../../data', `${key}.json`));
  }

  public getTestData = this.getExpectedData;

  public async preloadReminders(count: number) {
    const reminders = buildReminderObj(count, false);

    await this.graphqlRequest(
      `
      mutation Sync($reminders: [ReminderInput]!, $dateSyncRequested: Date!) {
        sync(reminders: $reminders, dateSyncRequested: $dateSyncRequested) {
          error
          reminders {
            dateCreated
            dateModified
            id
            text
            status
          }
        }
      }
    `,
      {
        dateSyncRequested: new Date().getTime(),
        reminders: Object.values(reminders),
      }
    );
  }

  private async graphqlRequest(query: string, vars?: { [key: string]: any }) {
    return graphqlRequest(
      'http://localhost:5000/inbox-981dc/us-central1/testUserGraphql/graphql',
      query,
      vars
    );
  }

  public async revokeToken() {
    await driver.setIdToken('VOID');
  }
}

export default new Api();
