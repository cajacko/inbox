import AppError from 'src/lib/modules/AppError';
import uuid from 'src/lib/utils/uuid';

/**
 * Wait for many callbacks to have run before resolving a promise
 */
class WaitForMany {
  private registeredIDs: {};
  private resolved: boolean;
  private rejected: AppError | null;
  private promise: Promise<any>;
  private check: () => void;
  private rejectMainPromise: (e: AppError) => void;

  /**
   * Initialise the class, that the initial promise to return
   */
  constructor() {
    this.registeredIDs = {};

    this.setPromise();
  }

  /**
   * Reset the promise
   */
  private setPromise() {
    this.resolved = false;
    this.rejected = null;

    this.promise = new Promise((resolve, reject) => {
      this.check = () => {
        if (Object.keys(this.registeredIDs).length) return;

        resolve();
        this.resolved = true;
      };

      this.rejectMainPromise = (e) => {
        this.rejected =
          e ||
          new AppError('WaitForMany got rejected without an error', '100-003');
        reject(this.rejected);
      };
    });
  }

  /**
   * Resolve one of the promises
   */
  public resolve(id: string) {
    delete this.registeredIDs[id];

    this.check();
  }

  /**
   * Reject everything
   */
  public reject(e: AppError) {
    this.rejectMainPromise(e);
  }

  /**
   * If the promise is resolves then setup a new promise
   */
  private setPromiseIfResolved() {
    if (this.resolved) this.setPromise();
  }

  /**
   * Register a new promise to wait for
   */
  public register(id: string) {
    this.registeredIDs[id] = true;
    this.setPromiseIfResolved();
  }

  /**
   * Register a promise that should be waited for
   */
  public waitFor(promise: Promise<any>, id?: string) {
    const promiseID = id || uuid();

    this.registeredIDs[promiseID] = true;

    this.setPromiseIfResolved();

    promise
      .then(() => {
        this.resolve(promiseID);
      })
      .catch(this.rejectMainPromise);
  }

  /**
   * Get whether the whole instance has been rejected
   */
  public isRejected() {
    return this.rejected;
  }

  /**
   * Get whether the whole instance is resolves
   */
  public isResolved() {
    return this.resolved;
  }

  /**
   * Get the promise we're waiting for
   */
  public getPromise() {
    this.check();

    return this.promise;
  }
}

export default WaitForMany;
