import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Modal from 'src/lib/components/Modal';
import { Children } from 'src/lib/types/libs';
import {
  get as getQueryParam,
  remove as removeQueryParam,
  set as setQueryParam,
} from 'src/lib/utils/queryParam';

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
 * Get a modal context, need this so we can have multiple modals
 */
const withModalContext = (zIndex: number, fullScreenBreakpoint?: number) => {
  const Context = React.createContext({});
  const { Consumer } = Context;

  const modalId = `modal-${zIndex}`;

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
      const id = getQueryParam(search, modalId);

      if (id === undefined) {
        return this.hiddenState;
      }

      if (!this.state || this.state.Component) return null;

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

      const search = setQueryParam(this.props.location.search, modalId, id);
      const location = `${this.props.location.pathname}${search}`;

      this.props.history.push(location);
    }

    /**
     * Hide the modal
     */
    private hide() {
      const search = removeQueryParam(this.props.location.search, modalId);
      const location = `${this.props.location.pathname}${search}`;

      this.props.history.push(location);
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
            <Modal
              fullScreenBreakpoint={fullScreenBreakpoint}
              Component={Component}
              props={props}
              hide={this.hide}
              zIndex={zIndex}
            />
          )}

          {this.props.children}
        </Context.Provider>
      );
    }
  }

  const Provider = withRouter(BasicProvider);

  return { Context, Consumer, Provider };
};

export default withModalContext;
