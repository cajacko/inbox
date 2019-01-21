import selectors, { ISelector } from '../config/selectors';
import driver from '../utils/driver';
import { ICondition } from '../utils/ensureCondition';
import getSelector from '../utils/getSelector';
import getVersion from '../utils/getVersion';

class Login {
  private appLogoSelector: ISelector = selectors.general.Login.AppLogo;
  private buttonSelector: ISelector = selectors.general.Login.Button;
  private containerSelector: ISelector = selectors.general.Login.Container;
  private errorTextSelector: ISelector = selectors.general.Login.Error.Text;
  private versionTextSelector: ISelector = selectors.general.Login.Version.Text;

  public appLogoVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.appLogoSelector));
  }

  public buttonVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.buttonSelector));
  }

  public errorText(condition: ICondition, text: string) {
    return driver.text(condition, getSelector(this.errorTextSelector), text);
  }

  public pressLoginButton() {
    return driver.press(getSelector(this.buttonSelector));
  }

  public async versionMatches() {
    const version = await getVersion();

    return driver.text(
      { positive: true, wait: false },
      getSelector(this.versionTextSelector),
      version
    );
  }

  public visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.containerSelector));
  }
}

export default new Login();
