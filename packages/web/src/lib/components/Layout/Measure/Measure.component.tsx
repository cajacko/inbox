import * as React from 'react';
import { Children } from 'src/lib/types/libs';
import Measure from 'src/modules/Measure';

export interface IMeasurements {
  width: number;
  height: number;
}

export interface IRenderProps extends IMeasurements {
  measureProps: { [key: string]: any };
}

interface IProps {
  onChange: (next: IMeasurements, last: IMeasurements) => boolean | void;
  children: (props: IRenderProps) => Children;
}

/**
 * Component that responds to changes in the childs dimensions
 */
class MeasureComponent extends React.Component<IProps, IMeasurements> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: IProps) {
    super(props);

    this.height = 0;
    this.width = 0;

    this.state = {
      height: this.height,
      width: this.width,
    };

    this.onChange = this.onChange.bind(this);

    const measure = new Measure(this.onChange);
    this.measureProps = measure.getComponentProps();
    this.unsubscribe = measure.unsubscribe;
  }

  /**
   * When the component unmounts unsubscribe from the size change listener
   */
  public componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  /**
   * When the dimensions change, store a ref to the new sizes and decide whether
   * to update the state and re render
   */
  private onChange({ height, width }: IMeasurements) {
    this.height = height;
    this.width = width;

    if (this.props.onChange) {
      const shouldUpdate = this.props.onChange(
        { height: this.height, width: this.width },
        this.state
      );

      if (shouldUpdate === false) return;
    }

    this.setState({ height: this.height, width: this.width });
  }

  private height: number;
  private width: number;
  private unsubscribe?: () => void;
  private measureProps: { [key: string]: any };

  /**
   * Render the component
   */
  public render() {
    const renderProps: IRenderProps = {
      height: this.state.height,
      measureProps: this.measureProps,
      width: this.state.width,
    };

    return this.props.children(renderProps);
  }
}

export default MeasureComponent;
