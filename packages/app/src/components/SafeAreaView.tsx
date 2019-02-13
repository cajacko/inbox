import * as React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native';
import { View } from 'src/components';
import { Children } from 'src/lib/types/libs';
import styled from 'styled-components';

interface IProps {
  children: Children;
}

const Content = styled(View)`
  flex: 1;
  position: relative;
`;

/**
 * The safe are view for the app
 */
const SafeAreaView = ({ children }: IProps) => (
  <RNSafeAreaView style={{ flex: 1 }}>
    <Content>{children}</Content>
  </RNSafeAreaView>
);

export default SafeAreaView;
