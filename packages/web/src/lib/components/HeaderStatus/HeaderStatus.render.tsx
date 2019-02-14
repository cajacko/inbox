import * as React from 'react';
import Cloud from 'src/lib/assets/icons/Cloud';
import {
  BackgroundColorVal,
  COLORS,
  ColorVal,
} from 'src/lib/config/styles/textIconColors';
import { IState } from 'src/lib/store/reducers';
import { Status } from './HeaderStatus.style';

export interface IContainerStateProps {
  status: IState['sync']['type'];
}

export interface IProps extends IContainerStateProps {
  backgroundColor: BackgroundColorVal;
}

/**
 * Display a list of reminders
 */
const HeaderStatus = ({ status, backgroundColor }: IProps) => {
  let color: ColorVal | undefined;
  let testID;

  switch (status) {
    case 'REQUESTED':
      color = COLORS.GREY_LIGHTER;
      testID = 'Header__Loading';
      break;
    case 'FAILED':
      color = COLORS.ERROR_DARK;
      testID = 'Header__Error';
      break;
    default:
      return null;
  }

  return (
    <Status testID={testID}>
      {color ? (
        <Cloud
          backgroundColor={backgroundColor}
          size={16}
          _dangerouslySetColor={color}
        />
      ) : null}
    </Status>
  );
};

export default HeaderStatus;
