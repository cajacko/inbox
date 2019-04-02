import { View } from 'src/components';
import { LINK_HEIGHT } from 'src/lib/components/ReminderLink/ReminderLink.style';
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
import platform from 'src/utils/platform';
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

export const reminderSpacing = 16;

export const REMINDER_HEIGHT = 50;

export const buttonStyle: React.CSSProperties = {
  flex: 1,
  flexDirection: 'row',
  width: '100%',
};

/**
 * Get the container height - the borders
 */
const containerHeight = (addLinkHeight: boolean, minusBorders: boolean) => ({
  hasBottomBorder,
  hasTopBorder,
  hasUrl,
}: IProps) => {
  let height = REMINDER_HEIGHT;

  if (minusBorders) {
    if (hasBottomBorder) height -= borderWidth;
    if (hasTopBorder) height -= borderWidth;
  }

  if (hasUrl && addLinkHeight) height += LINK_HEIGHT;

  return unit(height);
};

interface IProps {
  hasBottomBorder: boolean;
  hasTopBorder: boolean;
  hasUrl: boolean;
}

export const Wrapper = styled(AnimatedView)`
  overflow: hidden;
`;

export const Container = styled(View)<IProps>`
  ${({ hasBottomBorder, hasTopBorder }) =>
    border(GREY_LIGHTER, borderWidth, {
      bottom: hasBottomBorder,
      top: hasTopBorder,
    })}
  flex-direction: column;
  height: ${containerHeight(true, false)};
  background-color: ${BACKGROUND_COLOR};
`;

export const Content = styled(View)<IProps>`
  position: relative;
  z-index: 2;
  flex-direction: row;
  height: ${containerHeight(false, true)};
  background-color: ${BACKGROUND_COLOR};
`;

export const Inner = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  ${padding({ horizontal: reminderSpacing })};
  max-width: 100%;
  ${platform() === 'web' ? 'box-sizing: border-box;' : ''}
  overflow: hidden;
`;

interface IEditMenuProps {
  hasLink: boolean;
}

export const EditMenu = styled(View)<IEditMenuProps>`
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
  ${({ hasLink }) =>
    border(GREY_LIGHTER, 1, {
      bottom: hasLink,
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

export const TextContainer = styled(View)`
  flex: 1;
  ${margin({ right: 10 })}
  flex-direction: row;
  height: 100%;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const TextWrapper = styled(View)`
  flex: 1;
  overflow: hidden;
  ${platform() === 'web' ? 'white-space: nowrap;' : ''}
  position: absolute;
`;
