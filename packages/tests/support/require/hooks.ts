import { AfterAll, Before } from 'cucumber';
import driver from '../utils/driver';

Before(function (testCase) {
  this.testCase = testCase;
});

AfterAll(() => driver.close());
