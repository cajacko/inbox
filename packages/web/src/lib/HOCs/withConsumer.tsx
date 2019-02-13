/* eslint max-len: 0 */
import * as React from 'react';

type Context = any;

interface IProps {
  [key: string]: any;
}

interface IComponentProps extends IProps {
  context: Context;
}

interface IConsumerProps {
  children: (context: Context) => JSX.Element;
}

type ComponentType = React.ComponentType<IComponentProps>;
type ConsumerType = React.ComponentType<IConsumerProps>;

/**
 * Wrap the component with the given consumer
 */
const withConsumer = (Consumer: ConsumerType) => (Component: ComponentType) => (props: IProps) => (
  <Consumer>{context => <Component context={context} {...props} />}</Consumer>
);

export default withConsumer;
