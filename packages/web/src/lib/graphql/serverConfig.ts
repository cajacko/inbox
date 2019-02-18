import * as reminderResolvers from './reminder/resolvers';
import * as reminderTypeDefs from './reminder/typeDefs';
import * as syncResolvers from './sync/resolvers';
import * as syncTypeDefs from './sync/typeDefs';

interface IResolver {
  [key: string]: (...args: any) => any;
}

interface IResolvers {
  [key: string]: {
    Query?: IResolver;
    Mutation?: IResolver;
  };
}

interface ITypeDefs {
  [key: string]: {
    types: string;
    query?: string;
    mutation?: string;
  };
}

export const resolvers: IResolvers = {
  reminderResolvers,
  syncResolvers,
};

export const typeDefs: ITypeDefs = {
  reminderTypeDefs,
  syncTypeDefs,
};
