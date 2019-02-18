import { HookScenarioResult } from 'cucumber';
import { ensureFile, writeJSON } from 'fs-extra';
import { join } from 'path';
import { ILogs } from '../modules/Browser';
import getScenarioPath from './getScenarioPath';

const saveLogs = async (testCase: HookScenarioResult, logs: ILogs) => {
  const {
    dir, platform, size, filePath, scenario,
  } = getScenarioPath(testCase);

  const path = join(dir, 'logs', platform, size, filePath, `${scenario}.json`);

  return ensureFile(path)
    .then(() => writeJSON(path, logs, { spaces: 2 }))
    .then(() => path);
};

export default saveLogs;
