/** @format */

import { AppRegistry } from 'react-native';
import App from './src/lib/components/App';
import './src/modules/Sentry';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
