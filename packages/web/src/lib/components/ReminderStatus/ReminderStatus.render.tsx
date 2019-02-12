import * as React from 'react';
import Cloud from 'src/lib/assets/icons/Cloud';
import {
  BackgroundColorVal,
  COLORS,
} from 'src/lib/config/styles/textIconColors';
import { Status } from './ReminderStatus.style';

export interface IProps {
  status: 'saving' | 'saved' | 'error';
  backgroundColor: BackgroundColorVal;
}

/**
 * Display a list of reminders
 */
const ReminderStatus = ({ status, backgroundColor }: IProps) => {
  let color;
  let testID;

  switch (status) {
    case 'saved':
      color = COLORS.PRIMARY;
      testID = 'Reminder__Status--Saved';
      break;
    case 'saving':
      color = COLORS.GREY_LIGHT;
      testID = 'Reminder__Status--Saving';
      break;
    case 'error':
      color = COLORS.ERROR;
      testID = 'Reminder__Status--Error';
      break;
    default:
      color = null;
      break;
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

export default ReminderStatus;
