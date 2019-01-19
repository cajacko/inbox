import { expect } from 'chai';
import { ICondition } from './ensureCondition';
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
  { positive, wait }: ICondition,
  testFunc: () => Promise<boolean>,
  errors: Errors
) => {
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

        return positive ? result : !result;
      },
      positive ? getError('waitPositive') : getError('waitNegative')
    );

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
