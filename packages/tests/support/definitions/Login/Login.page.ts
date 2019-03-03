import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';
import getVersion from '../../utils/getVersion';

class Login {
  private titleSelector: ISelector = selectors.general.Login.Title;
  private buttonSelector: ISelector = selectors.general.Login.Button;
  private containerSelector: ISelector = selectors.general.Login.Container;
  private errorTextSelector: ISelector = selectors.general.Login.Error.Text;
  private versionTextSelector: ISelector = selectors.general.Login.Version.Text;
  private cancelButtonSelector: ISelector = selectors.general.Login.Cancel;
  private loadingSelector: ISelector = selectors.general.Login.Loading;
  private reloginSelector: ISelector = selectors.general.Relogin;

  public titleVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.titleSelector));
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
      `V${version}`
    );
  }

  public visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.containerSelector));
  }

  public pressCancelButton() {
    return driver.press(getSelector(this.cancelButtonSelector));
  }

  public cancelVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.cancelButtonSelector));
  }

  public loadingVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.loadingSelector));
  }

  public reloginVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.reloginSelector));
  }
}

export default new Login();