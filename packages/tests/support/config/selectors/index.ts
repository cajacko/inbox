import general from './general';

type selectorFunc = (opts?: { [key: string]: any }) => string;
type selector = string | selectorFunc;

export interface ISelector {
  [key: string]: selector | ISelector;
}

export default { general };
