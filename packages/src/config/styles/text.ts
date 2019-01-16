// Turn this off as we want to mimic the web semantics of h1, h2 etc
/* eslint id-length: 0 */
// colors handled in ~/config/styles/textIconColors.js

export const TYPES = {
  h1: {
    letterSpacing: -1.5,
    size: 96,
    uppercase: false,
    weight: 'light',
  },
  h2: {
    letterSpacing: -0.5,
    size: 60,
    uppercase: false,
    weight: 'light',
  },
  h3: {
    letterSpacing: 0,
    size: 48,
    uppercase: false,
    weight: 'regular',
  },
  h4: {
    letterSpacing: 0.5,
    size: 34,
    uppercase: false,
    weight: 'regular',
  },
  h5: {
    letterSpacing: 0,
    size: 24,
    uppercase: false,
    weight: 'regular',
  },
  h6: {
    letterSpacing: 0.15,
    size: 20,
    uppercase: false,
    weight: 'medium',
  },
  subtitle1: {
    letterSpacing: 0.15,
    size: 16,
    uppercase: false,
    weight: 'regular',
  },
  subtitle2: {
    letterSpacing: 0.1,
    size: 14,
    uppercase: false,
    weight: 'medium',
  },
  body1: {
    letterSpacing: 0.1,
    size: 16,
    uppercase: false,
    weight: 'regular',
  },
  body2: {
    letterSpacing: 0.25,
    size: 14,
    uppercase: false,
    weight: 'regular',
  },
  button: {
    letterSpacing: 0.75,
    size: 14,
    uppercase: true,
    weight: 'medium',
  },
  caption: {
    letterSpacing: 0.4,
    size: 12,
    uppercase: false,
    weight: 'regular',
  },
  overline: {
    letterSpacing: 1.5,
    size: 10,
    uppercase: true,
    weight: 'regular',
  },
};

export type Type = keyof typeof TYPES;

export const INPUT_TYPES = {
  body1: TYPES.body1,
  body2: TYPES.body2,
};
