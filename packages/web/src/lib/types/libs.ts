import { Action } from 'redux';

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
}
