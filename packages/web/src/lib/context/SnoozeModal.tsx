import withModalContext from 'src/lib/HOCs/withModalContext';

const { Context, Consumer, Provider } = withModalContext(2, {
  hideKeyboardOnOpen: true,
});

export { Context, Consumer, Provider };
