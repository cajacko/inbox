import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Modal from 'src/lib/components/Modal';
import { Children } from 'src/lib/types/libs';
import {
  get as getQueryParam,
  remove as removeQueryParam,
  set as setQueryParam,
} from 'src/lib/utils/queryParam';
import Keyboard from 'src/modules/Keyboard';

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

interface IOpts {
  fullScreenBreakpoint?: number;
  hideKeyboardOnOpen?: boolean;
}

/**
 * Get a modal context, need this so we can have multiple modals
 */
const withModalContext = (zIndex: number, opts: IOpts = {}) => {
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
     * When the component updates, if we've just shown the modal then hide the
     * keyboard
     */
    public componentDidUpdate(prevProps: IProps, prevState: IState) {
      if (
        opts.hideKeyboardOnOpen &&
        !prevState.Component &&
        this.state.Component
      ) {
        Keyboard.hide();
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
    private hide(hideAllModals: boolean = false) {
      let location;

      // If closing multiple modals at the same time, this func will probably
      // not get the new location when closing the 2nd modal, so it ends up
      // keeping one of them. So use the hide all flag to hide all modals
      if (hideAllModals) {
        location = this.props.location.pathname;
      } else {
        const search = removeQueryParam(this.props.location.search, modalId);
        location = `${this.props.location.pathname}${search}`;
      }

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
              fullScreenBreakpoint={opts.fullScreenBreakpoint}
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
