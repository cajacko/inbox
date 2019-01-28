import * as React from 'react';
import errors from 'src/lib/config/errors.json';
import { LogLevel } from 'src/modules/Sentry';

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

export interface IUser {
  id: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface IBreadcrumb {
  type: string;
  message: string;
  data?: any;
  timestamp: number;
}

export interface ISentryMessage {
  level: LogLevel;
  message: string;
  timestamp: number;
  route: string;
  data?: any;
  userId?: string;
  breadcrumbs: IBreadcrumb[];
  version: string;
  env: string;
  tags: {
    [key: string]: string;
  };
}

export type OnLogType = (
  level: LogLevel,
  message: string,
  data?: any,
  tags?: ISentryMessage['tags'],
  isFromConsoleWrap?: boolean
) => void;

type LoggerFunc = (arg0: string, ...params: any) => void;

export interface ILoggerInstance {
  critical: LoggerFunc;
  debug: LoggerFunc;
  error: LoggerFunc;
  fatal: LoggerFunc;
  info: LoggerFunc;
  log: LoggerFunc;
  warning: LoggerFunc;
}

export { LogLevel };
