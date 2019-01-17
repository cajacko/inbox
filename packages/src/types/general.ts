import * as React from 'react';

export type Text = string | { _textFromConst: string };

// Maybe one day we can figure out how to type these as the actual content?
export type MarketingTextKey = string;
export type MarketingTextValue = string;

export interface IError {
  label: string;
  title: MarketingTextKey;
  message: MarketingTextKey;
}

export interface IExtendedError extends IError {
  code: string;
}

export interface IErrors {
  [key: string]: IError;
}

export interface IExtendedErrors {
  [key: string]: IExtendedError;
}

export interface IRoute {
  exact?: boolean;
  path?: string;
  component: React.ComponentType;
}
