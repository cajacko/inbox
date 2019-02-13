import selectors, { ISelector } from '../../config/selectors';
import conditional from '../../utils/conditional';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class ErrorComponent {
  private errorSelector: ISelector = selectors.general.ErrorBoundary;
  private buttonSelector: ISelector = selectors.general.ErrorBoundary.Button;
  private codeSelector: ISelector = selectors.general.ErrorBoundary.Code;
  private buttonsSelector: ISelector = selectors.general.ErrorBoundary.Buttons;
  private buttonTextSelector: ISelector =
    selectors.general.ErrorBoundary.Button.Text;

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.errorSelector));
  }

  public async code(condition: ICondition, code: string) {
    const selector = getSelector(this.codeSelector);

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

  public async count(condition: ICondition, count: number) {
    let actualCount: number;

    const selector = getSelector(this.buttonsSelector);

    await conditional(
      condition,
      async () => {
        actualCount = await driver.getCount(selector);

        return actualCount === count;
      },
      () => ({
        negative: `Count of "${selector}" equals ${actualCount} expected it to not be ${count}`,
        positive: `Count of "${selector}" equals ${actualCount} expected it to be ${count}`,
        waitNegative: `Timeout whilst expecting count of "${selector}" to not be ${count}, last count was ${actualCount}`,
        waitPositive: `Timeout whilst expecting count of "${selector}" to be ${count}, last count was ${actualCount}`,
      })
    );
  }

  public async buttonText(condition: ICondition, index: number, text: string) {
    const selector = getSelector(this.buttonTextSelector, { index });

    await driver.text(condition, selector, text);
  }

  public async pressButton(index: number) {
    await driver.press(getSelector(this.buttonSelector, { index }));
  }
}

export default new ErrorComponent();
