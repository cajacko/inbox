/* eslint @miovision/disallow-date/no-static-date: 0 */
/* eslint @miovision/disallow-date/no-new-date: 0 */
/* eslint no-underscore-dangle: 0 */

import testHook from 'src/utils/testHook';

/**
 * Custom date class, used to mock the date
 */
class CustomDate {
  /**
   * If no args are given, the date will be now, so see if there's a test hook
   * for now to use
   */
  constructor(...args: any[]) {
    // @ts-ignore
    this._date = new Date(args.length === 0 ? testHook('now', Date.now()) : new Date(...args));

    Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
      this[method] = (...params: any[]) => this._date[method](...params);
    });
  }

  /**
   * Get the now time
   */
  public static now() {
    return testHook('now', Date.now());
  }

  /**
   * Get an actual date object for this instance
   */
  public toDate() {
    return new Date(this.getTime());
  }

  // tslint:disable-next-line
  private _date: Date;

  // Add actual date methods here as we use them
  public getTime: Date['getTime'];
  public setHours: Date['setHours'];
  public getHours: Date['getHours'];
  public setMinutes: Date['setMinutes'];
  public getMinutes: Date['getMinutes'];
  public setDate: Date['setDate'];
  public getDate: Date['getDate'];
  public getDay: Date['getDay'];
  public getMonth: Date['getMonth'];
  public setMonth: Date['setMonth'];
  public getFullYear: Date['getFullYear'];
  public setFullYear: Date['setFullYear'];
}

export default CustomDate;
