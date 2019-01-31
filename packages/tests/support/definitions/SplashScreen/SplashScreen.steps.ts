import { Then } from 'cucumber';
import ensureCondition from '../../utils/ensureCondition';
import splashScreen from './SplashScreen.page';

Then('the splash screen {string} visible', condition =>
  splashScreen.visible(ensureCondition(condition)));
