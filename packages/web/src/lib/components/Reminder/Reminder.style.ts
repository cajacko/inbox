import { View } from 'src/components';
import { ICON_SIZE as STATUS_ICON_SIZE } from 'src/lib/components/ReminderStatus/ReminderStatus.style';
import {
  GREEN,
  GREEN_DARK,
  GREY_LIGHTER,
  ORANGE_DARK,
  WHITE,
} from 'src/lib/config/styles/colors';
import border from 'src/lib/utils/applyBorder';
import margin from 'src/lib/utils/applyMargin';
import padding from 'src/lib/utils/applyPadding';
import { View as AnimatedView } from 'src/packages/animated';
import unit from 'src/utils/unit';
import styled from 'styled-components';

export const BACKGROUND_COLOR = WHITE;
export const ICON_SIZE = STATUS_ICON_SIZE;
export const CHECK_COLOR = GREEN;
export const SNOOZED_COLOR = ORANGE_DARK;

export const SWIPE_BACKGROUND_COLOR_LEFT = GREEN_DARK;
export const SWIPE_BACKGROUND_COLOR_RIGHT = ORANGE_DARK;
export const SWIPE_ICON_SIZE = 20;
const borderWidth = 2;

const reminderSpacing = 16;

export const REMINDER_HEIGHT = 50;

/**
 * Get the container height - the borders
 */
const containerHeight = ({ hasBottomBorder, hasTopBorder }: IProps) => {
  let height = REMINDER_HEIGHT;

  if (hasBottomBorder) height -= borderWidth;
  if (hasTopBorder) height -= borderWidth;

  return unit(height);
};

interface IProps {
  hasBottomBorder: boolean;
  hasTopBorder: boolean;
}

export const Wrapper = styled(AnimatedView)`
  overflow: hidden;
`;

export const Container = styled(View)<IProps>`
  position: relative;
  z-index: 2;
  ${({ hasBottomBorder, hasTopBorder }) =>
    border(GREY_LIGHTER, borderWidth, {
      bottom: hasBottomBorder,
      top: hasTopBorder,
    })}
  flex-direction: row;
  height: ${containerHeight};
  background-color: ${BACKGROUND_COLOR};
`;

export const Inner = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  ${padding({ horizontal: reminderSpacing })};
`;

export const EditMenu = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${BACKGROUND_COLOR};
  z-index: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${padding({ horizontal: reminderSpacing })}
  ${border(GREY_LIGHTER, 1, {
    left: true,
  })}}
`;

export const Icon = styled(View)`
  ${margin({ right: reminderSpacing })}
`;

export const Symbols = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const SwipeContainerLeft = styled(View)`
  background-color: ${SWIPE_BACKGROUND_COLOR_LEFT};
  flex: 1;
  justify-content: center;
  ${padding({ horizontal: reminderSpacing })}
`;

export const SwipeContainerRight = styled(SwipeContainerLeft)`
  background-color: ${SWIPE_BACKGROUND_COLOR_RIGHT};
  align-items: flex-end;
`;
