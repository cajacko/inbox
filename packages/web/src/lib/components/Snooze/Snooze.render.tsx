import * as React from 'react';
import { View } from 'src/components';

interface IProps {
  children: JSX.Element;
  fullScreen: boolean;
}

/**
 * Render and control the snooze modals
 */
const Snooze = ({ children }: IProps) => {
  console.log('Snooze');

  return <View>{null}</View>;
};

export default Snooze;
