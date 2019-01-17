import { expect } from 'chai';
import driver from '../utils/driver';
import selector from '../utils/selector';

class ErrorComponent {
  public async isVisible() {
    return driver.isVisible(selector('.ErrorBoundary'));
  }

  public async codeIs(code: string) {
    const text = await driver.getText(selector('.ErrorBoundary__Code'));

    expect(text).includes(code);
  }
}

export default new ErrorComponent();
