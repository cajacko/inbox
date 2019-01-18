import { After, AfterAll, Before } from 'cucumber';
import driver from '../utils/driver';

Before(function (testCase) {
  this.testCase = testCase;
});

After(() => {
  driver.clearHooks();
});

AfterAll(() => driver.close());
