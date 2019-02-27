import * as React from 'react';
import { SafeAreaView as RNSafeAreaView, StatusBar } from 'react-native';
import { View } from 'src/components';
import * as colors from 'src/lib/config/styles/colors';
import { Children } from 'src/lib/types/libs';
import styled from 'styled-components';

type ColorKey = keyof typeof colors;
type ColorVal = typeof colors[ColorKey];

interface IProps {
  children: Children;
  backgroundColor: ColorVal;
  barStyle: 'default' | 'light-content' | 'dark-content';
}

const Content = styled(View)`
  flex: 1;
  position: relative;
`;

/**
 * The safe are view for the app
 */
const SafeAreaView = ({ children, barStyle, backgroundColor }: IProps) => (
  <RNSafeAreaView style={{ flex: 1, backgroundColor }}>
    <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    <Content>{children}</Content>
  </RNSafeAreaView>
);

export default SafeAreaView;
