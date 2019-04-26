import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import { ICondition } from '../../utils/ensureCondition';
import getSelector from '../../utils/getSelector';

class DatePicker {
  private datePickerDay = selectors.general.DatePicker.Day;
  private datePickerTime = selectors.general.DatePicker.Time;
  private datePickerTimeContainer = selectors.general.DatePicker.TimeContainer;
  private datePickerContainer = selectors.general.DatePicker;

  public async pressDay(day: number) {
    return driver.press(getSelector(this.datePickerDay, { day }));
  }

  public async setTime(time: string) {
    const selector = getSelector(this.datePickerTime, { time });

    await driver.scrollIntoView(selector);

    return driver.press(selector);
  }

  public async timeVisible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.datePickerTimeContainer));
  }

  public async visible(condition: ICondition) {
    return driver.visible(condition, getSelector(this.datePickerContainer));
  }
}

export default new DatePicker();
