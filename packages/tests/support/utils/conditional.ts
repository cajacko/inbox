import { expect } from 'chai';
import logHOC from '../utils/log';
import ensureCondition, { ICondition } from './ensureCondition';
import waitFor from './waitFor';

const log = logHOC('CONDITIONAL');

interface IErrors {
  negative: string;
  positive: string;
  waitNegative: string;
  waitPositive: string;
}

type ErrorsFunc = () => IErrors;

export type Errors = IErrors | ErrorsFunc;

const conditional = async (
  condition: ICondition | string,
  testFunc: () => Promise<boolean>,
  errors: Errors,
  waitTimeout?: number
) => {
  log('conditional -> init');
  let wait: boolean;
  let positive: boolean;

  if (typeof condition === 'string') {
    ({ wait, positive } = ensureCondition(condition));
  } else {
    ({ wait, positive } = condition);
  }

  const getError = (type: keyof IErrors) => {
    if (typeof errors === 'function') {
      return errors()[type];
    }

    return errors[type];
  };

  if (wait) {
    log('conditional -> waitFor');

    return waitFor(
      () => {
        log('conditional -> waitFor -> testFunc');

        return testFunc()
          .then((result) => {
            log('conditional -> waitFor -> testFunc -> resolve');
            log(String(result));

            return positive ? !!result : !result;
          })
          .catch((e) => {
            log('conditional -> waitFor -> testFunc -> reject');
            log(e);
            throw e;
          });
      },
      () => (positive ? getError('waitPositive') : getError('waitNegative')),
      waitTimeout
    )
      .then((res) => {
        log('conditional -> waitFor -> resolve');
        log(String(res));
        return res;
      })
      .catch((e) => {
        if (e.timeout) {
          log('conditional -> waitFor -> catch -> timeout');
          throw e;
        }

        log('conditional -> waitFor -> catch');
        log(e);
        throw e;
      });
  }

  log('conditional -> no wait');

  const isVisible = await testFunc();

  if (positive) {
    log('conditional -> no wait -> positive');
    expect(isVisible).to.equal(true, getError('positive'));
  } else {
    log('conditional -> no wait -> negative');
    expect(isVisible).to.equal(false, getError('negative'));
  }

  log('conditional -> no wait -> resolve');

  return Promise.resolve();
};

export default conditional;
