import { HookScenarioResult } from 'cucumber';
import { join } from 'path';
import driver from './driver';
import getSize from './getSize';

const getScenarioPath = ({
  sourceLocation: { uri },
  pickle: { name },
}: HookScenarioResult) => {
  const filePath = uri.replace('features/', '').replace('.feature', '');
  const scenario = name.replace(/ /gm, '_').toLowerCase();
  const size = getSize();

  return {
    dir: join(__dirname, '../../'),
    filePath,
    platform: driver.platform,
    scenario,
    size,
  };
};

export default getScenarioPath;
