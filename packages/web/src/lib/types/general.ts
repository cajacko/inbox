import * as React from 'react';
import errors from 'src/lib/config/errors.json';
import { IState as IUserState } from 'src/lib/store/user/reducer';

export type ErrorCode = keyof typeof errors;

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
  public?: boolean;
}

export interface IState {
  user: IUserState;
}

export interface IUser {
  id: string;
  displayName: string | null;
  photoURL: string | null;
}
