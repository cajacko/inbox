import {
  BACKGROUND_COLORS,
  BackgroundColorVal,
  COLORS,
  COLORS_FOR_BACKGROUND,
  ColorVal,
} from 'src/lib/config/styles/textIconColors';
import AppError from 'src/lib/modules/AppError';
import ensureObjHasVal from 'src/lib/utils/ensureObjHasVal';

interface IProps {
  backgroundColor?: BackgroundColorVal;
  _dangerouslySetColor?: ColorVal;
  highlight?: boolean;
  greyedOut?: boolean;
  error?: boolean;
}

/**
 * Get the text or icon color, based off the passed in props. When you think
 * about it deciding the colour of text or an icon, is based on what the
 * background colour is, and what state the text should be in; normal,
 * highlighted or greyed out. This func then makes it easy for us to change
 * brand colours and have high confidence the text contrast is as intended
 */
const textIconColor = ({
  backgroundColor,
  _dangerouslySetColor,
  highlight,
  greyedOut,
  error,
}: IProps): string => {
  let finalTextColor;
  let finalBackgroundColor;

  if (_dangerouslySetColor) {
    finalTextColor = _dangerouslySetColor;
  } else if (!backgroundColor) {
    throw new AppError(
      'No color or background color was passed to textIconColor.js',
      '100-003'
    );
  } else {
    finalBackgroundColor = backgroundColor || BACKGROUND_COLORS.WHITE;
    finalTextColor = COLORS_FOR_BACKGROUND[finalBackgroundColor];

    if (!finalTextColor) {
      throw new AppError(
        'Could not derive the color for this text/icon',
        '100-003'
      );
    } else if (error && finalTextColor.error) {
      finalTextColor = finalTextColor.error;
    } else if (highlight && finalTextColor.highlight) {
      finalTextColor = finalTextColor.highlight;
    } else if (greyedOut && finalTextColor.greyedOut) {
      finalTextColor = finalTextColor.greyedOut;
    } else if (finalTextColor.default) {
      finalTextColor = finalTextColor.default;
    } else {
      throw new AppError(
        `No default color for background color: ${finalBackgroundColor}`,
        '100-003'
      );
    }
  }

  return ensureObjHasVal(
    COLORS,
    finalTextColor,
    new AppError(
      `Text/icon is not allowed to have the color ${String(finalTextColor)}${
        finalBackgroundColor
          ? `. With background color ${String(finalBackgroundColor)}`
          : ''
      }`,
      '100-003'
    )
  );
};

export default textIconColor;
