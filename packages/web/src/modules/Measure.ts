import { ResizeObserver } from 'resize-observer';
import { IMeasurements } from 'src/lib/components/Layout/Measure/Measure.component';

/**
 * Handle changes to the size of an element
 */
class Measure {
  private observer: ResizeObserver;
  private element: Element;
  private onChange?: (measurements: IMeasurements) => void;

  /**
   * Start observing
   */
  constructor(onChange: (measurements: IMeasurements) => void) {
    this.onChange = onChange;

    this.ref = this.ref.bind(this);
  }

  /**
   * Get the ref and start the observer
   */
  private ref(ref: Element) {
    if (!ref) return;

    this.element = ref;

    this.startObserver();
  }

  /**
   * Start watching the element
   */
  private startObserver() {
    this.observer = new ResizeObserver((targets) => {
      const { height, width } = targets[0].contentRect;

      if (!this.onChange) return;

      this.onChange({ height, width });
    });

    if (!this.element) return;

    this.observer.observe(this.element);
  }

  /**
   * Get the props to pass to the component
   */
  public getComponentProps() {
    return {
      ref: this.ref,
    };
  }

  /**
   * Unsubscribe the observer
   */
  public unsubscribe() {
    if (!this.observer) return;

    if (this.element) {
      this.observer.unobserve(this.element);
    }

    this.observer.disconnect();
  }
}

export default Measure;
