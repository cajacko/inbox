import selectors, { ISelector } from '../../config/selectors';
import driver from '../../utils/driver';
import ensureCondition, { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class Link {
  private textSelector: ISelector =
    selectors.general.ReminderList.Reminder.Link.Text;
  private linkSelector: ISelector =
    selectors.general.ReminderList.Reminder.Link;

  public async visible(index: number, condition: string, value: string) {
    const conditional = ensureCondition(condition);

    if (value === 'false') {
      conditional.positive = !conditional.positive;
    }

    return driver.visible(
      conditional,
      getSelector(this.textSelector, { index })
    );
  }

  public async linkIs(index: number, condition: ICondition, value: string) {
    if (value === 'null') return Promise.resolve();

    return driver.text(
      condition,
      getSelector(this.textSelector, { index }),
      value
    );
  }

  public async tapLink(index: number) {
    return driver.press(getSelector(this.linkSelector, { index }));
  }
}

export default new Link();
