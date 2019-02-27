import * as React from 'react';
import * as colors from 'src/lib/config/styles/colors';
import { Children } from 'src/lib/types/libs';

type ColorKey = keyof typeof colors;
type ColorVal = typeof colors[ColorKey];

interface IProps {
  children: Children;
  backgroundColor: ColorVal;
  barStyle: 'default' | 'light-content' | 'dark-content';
}

/**
 * The safe are view for the app
 */
const SafeAreaView = ({ children }: IProps) => (
  <React.Fragment>{children}</React.Fragment>
);

export default SafeAreaView;
