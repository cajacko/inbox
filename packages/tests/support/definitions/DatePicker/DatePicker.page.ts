import selectors from '../../config/selectors';
import driver from '../../utils/driver';
import getSelector from '../../utils/getSelector';

class DatePicker {
  private datePickerDay = selectors.general.DatePicker.Day;

  public async pressDay(day: number) {
    return driver.press(getSelector(this.datePickerDay, { day }));
  }
}

export default new DatePicker();
