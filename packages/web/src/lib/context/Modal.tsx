import * as React from 'react';
import Modal from 'src/lib/components/Modal';
import { Children } from 'src/lib/types/libs';

const Context = React.createContext({});
const { Consumer } = Context;

type ComponentType = (props: { [key: string]: any }) => JSX.Element;

interface IProps {
  children: Children;
}

interface IState {
  Component?: ComponentType;
  props: { [key: string]: any };
}

export interface IValue {
  hide: () => void;
  show: (Component: ComponentType, props?: IState['props']) => void;
  isVisible: boolean;
}

/**
 * The modal provider
 */
class Provider extends React.Component<IProps, IState> {
  /**
   * Set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.hiddenState = {
      Component: undefined,
      props: {},
    };

    this.state = this.hiddenState;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  private hiddenState: IState;

  /**
   * Show the modal
   */
  private show(Component: ComponentType, props: IState['props'] = {}) {
    this.setState({ Component, props });
  }

  /**
   * Hide the modal
   */
  private hide() {
    this.setState(this.hiddenState);
  }

  /**
   * Render the component
   */
  public render() {
    const { Component, props } = this.state;
    const value: IValue = {
      hide: this.hide,
      isVisible: !!Component,
      show: this.show,
    };

    return (
      <Context.Provider value={value}>
        {!!Component && (
          <Modal>
            <Component {...props} />
          </Modal>
        )}

        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, Consumer, Provider };
