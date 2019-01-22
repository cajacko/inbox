import { LayoutChangeEvent } from 'react-native';
import { IMeasurements } from 'src/lib/components/Layout/Measure/Measure.component';

/**
 * Handle changes to the size of an element
 */
class Measure {
  private onChange?: (measurements: IMeasurements) => void;

  /**
   * Start observing
   */
  constructor(onChange: (measurements: IMeasurements) => void) {
    this.onChange = onChange;
  }

  /**
   * Start watching the element
   */
  private onLayout(event: LayoutChangeEvent) {
    const { height, width } = event.nativeEvent.layout;

    if (!this.onChange) return;

    this.onChange({ height, width });
  }

  /**
   * Get the props to pass to the component
   */
  public getComponentProps() {
    return {
      onLayout: this.onLayout,
    };
  }

  /**
   * Unsubscribe the observer
   */
  public unsubscribe() {
    // No need to do anything here on native
  }
}

export default Measure;
