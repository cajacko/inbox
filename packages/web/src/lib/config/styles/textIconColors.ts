import {
  BLACK,
  ERROR,
  GREY,
  GREY_DARK,
  GREY_LIGHTER,
  PRIMARY,
  PRIMARY_DARK,
  SECONDARY,
  WHITE,
} from './colors';

export const COLORS = {
  BLACK,
  ERROR,
  GREY,
  GREY_DARK,
  PRIMARY,
  PRIMARY_DARK,
  WHITE,
};

export type Color = keyof typeof COLORS;

export const BACKGROUND_COLORS = {
  ERROR,
  GREY_LIGHTER,
  PRIMARY,
  PRIMARY_DARK,
  SECONDARY,
  WHITE,
};

export type BackgroundColor = keyof typeof BACKGROUND_COLORS;

interface IColorsForBackground {
  [key: string]: {
    default: string;
    error?: string;
    greyedOut?: string;
    highlight?: string;
  };
}

const LIGHT_BACKGROUND = {
  default: COLORS.BLACK,
  error: COLORS.ERROR,
  greyedOut: COLORS.GREY,
  highlight: COLORS.PRIMARY_DARK,
};

export const COLORS_FOR_BACKGROUND: IColorsForBackground = {
  [BACKGROUND_COLORS.WHITE]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.PRIMARY]: {
    default: COLORS.BLACK,
    greyedOut: COLORS.GREY,
  },
  [BACKGROUND_COLORS.PRIMARY_DARK]: {
    default: COLORS.WHITE,
    greyedOut: COLORS.GREY,
  },
  [BACKGROUND_COLORS.GREY_LIGHTER]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.SECONDARY]: {
    default: COLORS.BLACK,
  },
  [BACKGROUND_COLORS.ERROR]: {
    default: COLORS.WHITE,
  },
};
