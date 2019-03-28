/* eslint max-len: 0 */
import * as React from 'react';

type Context = any;

interface IProps {
  [key: string]: any;
}

interface IComponentProps extends IProps {
  [key: string]: Context;
}

interface IConsumerProps {
  children: (context: Context) => JSX.Element;
}

type ComponentType = React.ComponentType<IComponentProps>;
type ConsumerType = React.ComponentType<IConsumerProps>;

/**
 * Wrap the component with the given consumer
 */
const withConsumer = (Consumer: ConsumerType, contextId?: string) => (Component: ComponentType) => (props: IProps) => (
  <Consumer>
    {(context) => {
      const componentProps = contextId ? { [contextId]: context } : { context };

      return <Component {...componentProps} {...props} />;
    }}
  </Consumer>
);

export default withConsumer;
