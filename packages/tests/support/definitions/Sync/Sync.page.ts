import driver from '../../utils/driver';

type FinishedResponse = 'SUCCESS' | 'ERROR';
type Response = 'INIT' | FinishedResponse;

class Sync {
  private listeners: {
    [key: string]: (url: string, response: Response) => void;
  };

  private requests: Response[];
  private listenerId: number;
  private unsubscribe: () => void;

  constructor() {
    this.listenerId = 0;
    this.requests = [];
    this.listeners = {};

    this.setListener();
  }

  public setListener = () => {
    if (this.unsubscribe) this.unsubscribe();

    let lastRequest204 = false;

    this.unsubscribe = driver.networkListener((
      url: string,
      response: Response,
      { status }: { status: number | null }
    ) => {
      if (!url.includes('graphql')) return;
      if (lastRequest204) {
        lastRequest204 = false;
        return;
      }

      if (status === 204) {
        lastRequest204 = true;
        return;
      }

      lastRequest204 = false;

      switch (response) {
        case 'INIT':
          this.requests.push('INIT');
          break;
        case 'SUCCESS':
          this.requests[this.requests.length - 1] = 'SUCCESS';
          break;
        case 'ERROR':
          this.requests[this.requests.length - 1] = 'ERROR';
          break;
        default:
          return;
      }

      Object.values(this.listeners).forEach((listener) => {
        listener(url, response);
      });
    });
  };

  public request(index: number, key: FinishedResponse) {
    return new Promise((resolve, actualReject) => {
      const reject = () => {
        actualReject(new Error(`Sync request did not become ${key}`));
      };

      const initResponse = this.requests[index];

      if (initResponse && initResponse !== 'INIT') {
        if (initResponse === key) {
          resolve();
        } else {
          reject();
        }
      }

      const id = `listener-id-${this.listenerId}`;

      this.listenerId += 1;

      this.listeners[id] = () => {
        const response = this.requests[index];

        if (response === 'INIT') return;

        if (response === key) {
          resolve();
        } else {
          reject();
        }

        delete this.listeners[id];
      };
    });
  }

  public reset() {
    this.requests = [];
    this.listeners = {};

    this.setListener();
  }
}

export default new Sync();
