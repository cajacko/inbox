import { Action, Middleware as RMiddleware } from 'redux';

export type Children =
  | JSX.Element[]
  | JSX.Element
  | React.ReactNode
  | React.ReactNode[];

export interface IPayload {
  [key: string]: any;
}

export interface IAction extends Action {
  payload: IPayload;
  analytics?: {
    action?: string;
    category?: string;
    label?: string;
    value?: number;
    doNotSendEvent?: boolean;
  };
}

export type Middleware = RMiddleware<{}, any, any>;
