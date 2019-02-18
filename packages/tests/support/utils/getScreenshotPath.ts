import { HookScenarioResult } from 'cucumber';
import { join } from 'path';
import getScenarioPath from './getScenarioPath';

const getScreenshotPath = (scenarioResult: HookScenarioResult) => {
  const {
    dir, platform, size, filePath, scenario,
  } = getScenarioPath(scenarioResult);

  return join(dir, 'screenshots', platform, size, filePath, `${scenario}.png`);
};

export default getScreenshotPath;
