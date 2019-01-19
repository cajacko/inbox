import conditional from '../utils/conditional';
import driver from '../utils/driver';
import { ICondition } from '../utils/ensureCondition';
import getSelector from '../utils/getSelector';

class ErrorComponent {
  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector('ErrorBoundary'));
  }

  public async code(condition: ICondition, code: string) {
    const selector = getSelector('ErrorBoundary__Code');

    await conditional(
      condition,
      async () => {
        const text = await driver.getText(selector);

        return text.includes(code);
      },
      {
        negative: `Text at "${selector}" includes "${code}"`,
        positive: `Text at "${selector}" does not include "${code}"`,
        waitNegative: `Timeout waiting for text at "${selector}" to not include "${code}"`,
        waitPositive: `Timeout waiting for text at "${selector}" to include "${code}"`,
      }
    );
  }
}

export default new ErrorComponent();
