// typescript wont import the json properly unless it's a require
// tslint:disable-next-line
const loginDetails = require('../../loginDetails.local.json');

const hookConstants = { loginDetails };

export const set = (key: string, value: any) => {
  hookConstants[key] = value;
};

export default () => hookConstants;
