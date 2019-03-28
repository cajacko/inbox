import { HookScenarioResult } from 'cucumber';
import { join } from 'path';
import driver from './driver';
import getSize from './getSize';

const formatString = (param: string) =>
  param
    .trim()
    .replace(/ /gm, '_')
    .toLowerCase();

const getScenarioPath = (result: HookScenarioResult, params?: string) => {
  const {
    sourceLocation: { uri },
    pickle: { name },
  } = result;

  const filePath = uri.replace('features/', '').replace('.feature', '');
  const scenario = formatString(name);

  const size = getSize();
  const exampleParams = params
    ? params
      .split(',')
      .map(formatString)
      .filter(param => param !== '')
    : [];

  return {
    dir: join(__dirname, '../../'),
    exampleParams,
    filePath,
    platform: driver.platform,
    scenario,
    size,
  };
};

export default getScenarioPath;
