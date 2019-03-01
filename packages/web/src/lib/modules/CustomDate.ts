/* eslint @miovision/disallow-date/no-static-date: 0 */

import testHook from 'src/utils/testHook';

/**
 * Custom date class, used to mock the date
 */
class CustomDate extends Date {
  /**
   * If no args are given, the date will be now, so see if there's a test hook
   * for now to use
   */
  constructor(...args: any[]) {
    if (args.length === 0) {
      super(testHook('now', Date.now()));
    } else {
      // @ts-ignore
      super(...args);
    }
  }

  /**
   * Get the now time
   */
  public static now() {
    return testHook('now', Date.now());
  }
}

export default CustomDate;
