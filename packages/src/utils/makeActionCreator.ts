type IArgs = any[];

type Func = (...args: IArgs) => {};

type ArgNames = Array<Func | string>;

/**
 * Func that returns a redux action
 */
const makeActionCreator = (type: string, ...argNames: ArgNames) => {
  const func = argNames[0];

  if (typeof func === 'function' && argNames.length === 1) {
    return (...args: IArgs) => ({ type, payload: func(...args) });
  }

  return (...args: IArgs) => {
    const payload: {
      [key: string]: any;
      } = {};

    argNames.forEach((arg, index) => {
      if (typeof arg === 'function') return;

      payload[arg] = args[index];
    });

    return {
      payload,
      type,
    };
  };
};

export default makeActionCreator;
