import driver from '../../utils/driver';

class Modal {
  public async pressBackgroundButton() {
    return driver.pressCoordinates(1300, 900);
  }
}

export default new Modal();
