export type SupportedType = string | number | boolean | undefined;

export interface IObject {
  [key: string]: SupportedType | IObject | SupportedType[] | IObject[];
}

export type AllSupportedTypes =
  | SupportedType
  | IObject
  | SupportedType[]
  | IObject[];

export interface IDb {
  get: (location: string) => Promise<any>;
  set: (location: string, value: AllSupportedTypes) => Promise<void>;
  remove: (location: string) => Promise<void>;
  _clearQueue?: () => Promise<void>;
}

export type DB = (userID: string) => IDb;
