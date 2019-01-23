import * as React from 'react';
import { Children } from 'src/lib/types/libs';

interface IProps {
  children: Children;
}

/**
 * The safe are view for the app
 */
const SafeAreaView = ({ children }: IProps) => (
  <React.Fragment>{children}</React.Fragment>
);

export default SafeAreaView;
