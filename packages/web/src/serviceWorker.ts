/* eslint no-console: 0  */
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );

const isLocalhost = false;

interface IConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

/**
 * Register the valid service worker
 */
function registerValidSW(swUrl: string, config?: IConfig) {
  window.navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // This code comes from cra so leaving it
      // eslint-disable-next-line no-param-reassign
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (window.navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.debug('New content is available and will be used when all ' +
                  'tabs for this page are closed. See http://bit.ly/CRA-PWA.');

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.debug('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

/**
 * Check the service worker is valid
 */
function checkValidServiceWorker(swUrl: string, config?: IConfig) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        window.navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.debug('No internet connection found. App is running in offline mode.');
    });
}

/**
 * Register the service worker
 */
export function register(config?: IConfig) {
  if (
    // process.env.NODE_ENV === 'production' &&
    'serviceWorker' in window.navigator
  ) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      String(process.env.PUBLIC_URL),
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still
        // exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        window.navigator.serviceWorker.ready.then(() => {
          console.debug('This web app is being served cache-first by a service ' +
              'worker. To learn more, visit http://bit.ly/CRA-PWA');
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Unregister the service worker
 */
export function unregister() {
  if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}