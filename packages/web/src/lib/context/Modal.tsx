import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Modal from 'src/lib/components/Modal';
import { Children } from 'src/lib/types/libs';
import addQueryToLocation from 'src/lib/utils/addQueryToLocation';

const Context = React.createContext({});
const { Consumer } = Context;

type ComponentType = React.ComponentType<{
  fullScreen: boolean;
}>;

interface IProps extends RouteComponentProps {
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
class BasicProvider extends React.Component<IProps, IState> {
  /**
   * Set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.prevModalId = 0;
    this.prevModals = {};

    this.hiddenState = {
      Component: undefined,
      props: {},
    };

    this.state = this.getStateFromProps(props) || this.hiddenState;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  /**
   * When the component gets new props, decide whether to update the state
   */
  public componentWillReceiveProps(props: IProps) {
    const state = this.getStateFromProps(props);

    if (state) {
      this.setState(state);
    }
  }

  /**
   * Get the state from the props
   */
  private getStateFromProps({ location: { search } }: IProps) {
    if (!search || !search.includes('modal=')) {
      return this.hiddenState;
    }

    if (!this.state || this.state.Component) return null;

    const id = this.parsePrevModalId(search);

    if (!id) return null;

    const prevState = this.prevModals[id];

    if (!prevState) return null;

    return prevState;
  }

  /**
   * GEt the next prev modal id
   */
  private getPrevModalId() {
    this.prevModalId += 1;

    return `${this.prevModalId}`;
  }

  private hiddenState: IState;
  private prevModals: { [key: string]: IState };
  private prevModalId: number;

  /**
   * Parse the prev modal id from a text string
   */
  private parsePrevModalId(id?: string) {
    if (!id) return null;

    return parseInt(id.replace('?', '').replace('modal=', ''), 10);
  }

  /**
   * Show the modal
   */
  private show(Component: ComponentType, props: IState['props'] = {}) {
    this.setState({ Component, props });

    const id = this.getPrevModalId();
    this.prevModalId += 1;

    this.prevModals[id] = {
      Component,
      props,
    };

    const location = addQueryToLocation(
      this.props.location.pathname,
      'modal',
      id
    );

    this.props.history.push(location);
  }

  /**
   * Hide the modal
   */
  private hide() {
    this.props.history.push(this.props.location.pathname);
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
          <Modal Component={Component} props={props} hide={this.hide} />
        )}

        {this.props.children}
      </Context.Provider>
    );
  }
}

const Provider = withRouter(BasicProvider);

export { Context, Consumer, Provider };
