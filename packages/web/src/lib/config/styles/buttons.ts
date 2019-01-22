import get from 'lodash/get';
import set from 'lodash/set';
import { STANDARD_SPACING } from 'src/lib/config/styles/spacing';
import {
  BACKGROUND_COLORS,
  BackgroundColorVal,
  COLORS,
  COLORS_FOR_BACKGROUND,
  ColorVal,
} from 'src/lib/config/styles/textIconColors';

interface IStyles {
  textColor?: ColorVal;
  backgroundColor?: BackgroundColorVal;
  iconColor?: ColorVal;
  width?: number;
  height?: number;
  borderRadius?: number;
  paddingHorizontal?: number;
  themes?: {
    [key: string]: IStyles;
  };
}

export interface IType {
  textColor: ColorVal;
  backgroundColor?: BackgroundColorVal;
  DEFAULT?: IType;
  iconColor: ColorVal;
  width: number;
  height: number;
  borderRadius?: number;
  paddingHorizontal?: number;
}

export const BUTTON_BORDER_RADIUS = 5;
const buttonWidth = 150;
const buttonHeight = 40;
const buttonPaddingHorizontal = STANDARD_SPACING;
const circleSize = 60;

const styles: { [key: string]: IStyles } = {
  CONTAINED: {
    borderRadius: BUTTON_BORDER_RADIUS,
    height: buttonHeight,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        backgroundColor: BACKGROUND_COLORS.PRIMARY,
      },
      SECONDARY: {
        backgroundColor: BACKGROUND_COLORS.SECONDARY,
      },
    },
    width: buttonWidth,
  },
  CONTAINED_CIRCLE_ICON: {
    borderRadius: circleSize / 2,
    height: circleSize,
    themes: {
      PRIMARY: {
        backgroundColor: BACKGROUND_COLORS.PRIMARY,
      },
    },
    width: circleSize,
  },
  ICON: {
    height: buttonHeight,
    themes: {
      DEFAULT: {
        iconColor: COLORS_FOR_BACKGROUND[BACKGROUND_COLORS.WHITE].default,
      },
      GREYED_OUT: {
        iconColor: COLORS_FOR_BACKGROUND[BACKGROUND_COLORS.WHITE].greyedOut,
      },
    },
    width: buttonHeight,
  },
  OUTLINE: {
    borderRadius: BUTTON_BORDER_RADIUS,
    height: buttonHeight,
    paddingHorizontal: buttonPaddingHorizontal,
    width: buttonWidth,
  },
  TOGGLE: {
    height: buttonHeight,
    width: buttonWidth,
  },
  TRANSPARENT: {
    height: buttonHeight,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      BLACK: {
        textColor: COLORS.BLACK,
      },
      GREY_DARK: {
        textColor: COLORS.GREY_DARK,
      },
      PRIMARY: {
        textColor: COLORS.PRIMARY_DARK,
      },
    },
    width: buttonWidth,
  },
};

/**
 * Set the default prop
 */
const setDefault = (type: keyof typeof styles, defaultVal: string) => {
  const val = get(styles, [type, 'themes', defaultVal]);

  if (!val) return;

  set(styles, [type, 'themes', 'DEFAULT'], val);
};

setDefault('CONTAINED_CIRCLE_ICON', 'PRIMARY');
setDefault('CONTAINED', 'PRIMARY');
setDefault('TRANSPARENT', 'PRIMARY');

const exportProps = {};

Object.keys(styles).forEach((type) => {
  const style = styles[type];
  const typeStyles = Object.assign({}, style);
  delete typeStyles.themes;

  const typeObj: {
    _isThemeRoot: boolean;
    DEFAULT?: {};
    } = {
      _isThemeRoot: true,
    };

  if (style.themes) {
    Object.keys(style.themes).forEach((theme) => {
      const themeStyles = (style.themes && style.themes[theme]) || {};

      typeObj[theme] = {
        ...typeStyles,
        ...themeStyles,
      };
    });
  } else {
    typeObj.DEFAULT = {
      ...typeStyles,
    };
  }

  exportProps[type] = typeObj;
});

export default exportProps;
