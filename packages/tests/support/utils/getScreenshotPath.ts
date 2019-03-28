import { HookScenarioResult } from 'cucumber';
import { join } from 'path';
import getScenarioPath from './getScenarioPath';

const getScreenshotPath = (
  scenarioResult: HookScenarioResult,
  params?: string
) => {
  const {
    dir,
    exampleParams,
    platform,
    size,
    filePath,
    scenario,
  } = getScenarioPath(scenarioResult, params);

  const exampleString = exampleParams.length
    ? exampleParams.reduce((acc, param) => `${acc}_${param}`, '-')
    : '';

  return join(
    dir,
    'screenshots',
    platform,
    size,
    filePath,
    `${scenario}${exampleString}.png`
  );
};

export default getScreenshotPath;
