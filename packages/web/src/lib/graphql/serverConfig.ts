import * as reminderTypeDefs from './reminder/typeDefs';
import * as reminderResolvers from './reminder/resolvers';

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
};

export const typeDefs: ITypeDefs = {
  reminderTypeDefs,
};
