import { HookScenarioResult } from 'cucumber';
import { join } from 'path';
import getSize from './getSize';

const getScreenshotPath = (
  { sourceLocation: { uri }, pickle: { name } }: HookScenarioResult,
  platform: string
) => {
  const filePath = uri.replace('features/', '').replace('.feature', '');
  const scenario = name.replace(/ /gm, '_').toLowerCase();
  const size = getSize();

  return join(
    __dirname,
    '../../../../screenshots',
    platform,
    size,
    filePath,
    `${scenario}.png`
  );
};

export default getScreenshotPath;
