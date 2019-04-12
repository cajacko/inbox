import withModalContext from 'src/lib/HOCs/withModalContext';

const { Context, Consumer, Provider } = withModalContext(1, {
  fullScreenBreakpoint: 800,
});

export { Context, Consumer, Provider };
