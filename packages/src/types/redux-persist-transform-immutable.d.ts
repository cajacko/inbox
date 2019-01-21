declare module 'redux-persist-transform-immutable' {
  import { Transform } from 'redux-persist';

  function foo(): Transform<any, any>;

  export default foo;
}
