import { expect } from 'chai';
import ensureCondition, { ICondition } from './ensureCondition';
import waitFor from './waitFor';

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
  errors: Errors
) => {
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
    await waitFor(
      async () => {
        const result = await testFunc();

        return positive ? !!result : !result;
      },
      () => (positive ? getError('waitPositive') : getError('waitNegative'))
    ).catch((e) => {
      // eslint-disable-next-line
      console.error(
        'testFunc threw during a waiting conditional, ensure the testFunc resolves with a boolean and only errors if something does go wrong. See below for the error');
      throw e;
    });

    return;
  }

  const isVisible = await testFunc();

  if (positive) {
    expect(isVisible).to.equal(true, getError('positive'));
  } else {
    expect(isVisible).to.equal(false, getError('negative'));
  }
};

export default conditional;
