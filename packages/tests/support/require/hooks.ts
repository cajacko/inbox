import { After, AfterAll, Before, setDefaultTimeout } from 'cucumber';
import driver from '../utils/driver';

setDefaultTimeout(60 * 1000);

Before(function (testCase) {
  this.testCase = testCase;
});

After(() => {
  driver.clearHooks();
});

AfterAll(() => driver.close());
