import { HookScenarioResult } from 'cucumber';
import { join } from 'path';

const getScreenshotPath = (
  { sourceLocation: { uri }, pickle: { name } }: HookScenarioResult,
  platform: string
) => {
  const filePath = uri.replace('features/', '').replace('.feature', '');
  const scenario = name.replace(/ /gm, '_').toLowerCase();

  return join(
    __dirname,
    '../../screenshots',
    platform,
    filePath,
    `${scenario}.png`
  );
};

export default getScreenshotPath;
