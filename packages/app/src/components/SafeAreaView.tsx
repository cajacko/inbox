import * as React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Children } from 'src/lib/types/libs';

interface IProps {
  children: Children;
}

/**
 * The safe are view for the app
 */
const SafeAreaView = ({ children }: IProps) => (
  <RNSafeAreaView style={{ flex: 1 }}>{children}</RNSafeAreaView>
);

export default SafeAreaView;
