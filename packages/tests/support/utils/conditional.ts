import { expect } from 'chai';
import { ICondition } from './ensureCondition';
import waitFor from './waitFor';

const conditional = async (
  { positive, wait }: ICondition,
  testFunc: () => Promise<boolean>,
  errors: {
  negative: string;
  positive: string;
  waitNegative: string;
  waitPositive: string;
  }
) => {
  if (wait) {
    await waitFor(
      async () => {
        const result = await testFunc();

        return positive ? result : !result;
      },
      positive ? errors.waitPositive : errors.waitNegative
    );

    return;
  }

  const isVisible = await testFunc();

  if (positive) {
    expect(isVisible).to.equal(true, errors.positive);
  } else {
    expect(isVisible).to.equal(false, errors.negative);
  }
};

export default conditional;
