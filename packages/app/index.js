/** @format */

import { AppRegistry } from 'react-native';
import App from './src/lib/components/App';
import './src/modules/Sentry';
import { name as appName } from './app.json';

// eslint-disable-next-line
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
