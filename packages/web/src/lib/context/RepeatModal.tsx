import withModalContext from 'src/lib/HOCs/withModalContext';

const { Context, Consumer, Provider } = withModalContext(3, {
  hideKeyboardOnOpen: true,
});

export { Context, Consumer, Provider };
