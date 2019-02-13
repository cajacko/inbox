import { diff } from 'deep-diff';
import { readJSON } from 'fs-extra';
import { join } from 'path';
import { inspect } from 'util';
import conditional from '../../utils/conditional';
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
    return fetchApi('clearTestUser')
      .then(() => this.getUserData())
      .then((data) => {
        if (!isEqual(data, {})) {
          throw new Error('clearTestData did not clear successfully');
        }
      });
  }

  private async getUserData() {
    return fetchApi('getTestUser');
  }

  private getExpectedData(key: string) {
    return readJSON(join(__dirname, '../../data', `${key}.json`));
  }
}

export default new Api();
