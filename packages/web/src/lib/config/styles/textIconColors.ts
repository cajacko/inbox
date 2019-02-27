import {
  BLACK,
  ERROR,
  ERROR_DARK,
  GREEN,
  GREEN_DARK,
  GREY,
  GREY_DARK,
  GREY_LIGHT,
  GREY_LIGHTER,
  PRIMARY,
  PRIMARY_DARK,
  SECONDARY,
  SECONDARY_DARK,
  WHITE,
} from './colors';

export const COLORS = {
  BLACK,
  ERROR,
  ERROR_DARK,
  GREEN,
  GREEN_DARK,
  GREY,
  GREY_DARK,
  GREY_LIGHT,
  GREY_LIGHTER,
  PRIMARY,
  PRIMARY_DARK,
  WHITE,
};

export type ColorKey = keyof typeof COLORS;
export type ColorVal = typeof COLORS[ColorKey];

export const BACKGROUND_COLORS = {
  ERROR,
  GREEN_DARK,
  GREY_LIGHTER,
  PRIMARY,
  PRIMARY_DARK,
  SECONDARY,
  SECONDARY_DARK,
  WHITE,
};

export type BackgroundColorKey = keyof typeof BACKGROUND_COLORS;
export type BackgroundColorVal = typeof BACKGROUND_COLORS[BackgroundColorKey];

type ColorsForBackground = {
  [K in BackgroundColorVal]: {
    default: ColorVal;
    error: ColorVal;
    greyedOut: ColorVal;
    highlight: ColorVal;
  }
};

const LIGHT_BACKGROUND = {
  default: COLORS.BLACK,
  error: COLORS.ERROR,
  greyedOut: COLORS.GREY,
  highlight: COLORS.PRIMARY_DARK,
};

export const COLORS_FOR_BACKGROUND: ColorsForBackground = {
  [BACKGROUND_COLORS.WHITE]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.PRIMARY]: {
    default: COLORS.BLACK,
    error: COLORS.ERROR,
    greyedOut: COLORS.GREY,
    highlight: COLORS.GREY_DARK,
  },
  [BACKGROUND_COLORS.PRIMARY_DARK]: {
    default: COLORS.WHITE,
    error: COLORS.ERROR,
    greyedOut: COLORS.GREY,
    highlight: COLORS.GREY_LIGHT,
  },
  [BACKGROUND_COLORS.GREY_LIGHTER]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.SECONDARY]: {
    default: COLORS.BLACK,
    error: COLORS.BLACK,
    greyedOut: COLORS.GREY,
    highlight: COLORS.GREY_DARK,
  },
  [BACKGROUND_COLORS.ERROR]: {
    default: COLORS.WHITE,
    error: COLORS.WHITE,
    greyedOut: COLORS.GREY,
    highlight: COLORS.GREY_LIGHT,
  },
  [BACKGROUND_COLORS.GREEN_DARK]: {
    default: COLORS.WHITE,
    error: COLORS.WHITE,
    greyedOut: COLORS.GREY,
    highlight: COLORS.GREY_LIGHT,
  },
};
