import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import getSelector from '../../utils/getSelector';

class DatePicker {
  private datePickerDay = selectors.general.DatePicker.Day;
  private datePickerTime = selectors.general.DatePicker.Time;

  public async pressDay(day: number) {
    return driver.press(getSelector(this.datePickerDay, { day }));
  }

  public async setTime(time: string) {
    const selector = getSelector(this.datePickerTime, { time });

    await driver.scrollIntoView(selector);

    return driver.press(selector);
  }
}

export default new DatePicker();
