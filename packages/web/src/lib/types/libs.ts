import { Dispatch as RDispatch, Middleware as RMiddleware } from 'redux';
import { PreActions } from 'src/lib/store/actions';

export type Children =
  | JSX.Element[]
  | JSX.Element
  | React.ReactNode
  | React.ReactNode[];

export type Dispatch = RDispatch<PreActions>;

export type Middleware = RMiddleware<{}, any, any>;
